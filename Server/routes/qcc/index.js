// QCC FORUM PATH
var router = require('express').Router();
const fs = require('fs')
// var router = express.Router();

const security = require('../../helpers/security');
const cmdMultipleQuery = require('../../config/MultipleQueryConnection');
const response = require('../../helpers/response')
const auth = require('../../helpers/auth')
const upload = require('../../helpers/upload')

const jwt = require('jsonwebtoken');

const { aleaRNGFactory } = require("number-generator");

async function lastId(table, col) {
    let q = `SELECT * from ${table} ORDER BY ${col} DESC LIMIT 1`
    return await cmdMultipleQuery(q)
        .then((result) => {
            console.log(result);
            
            if(result.length > 0) {
                return result[0][col] + 1
            }
            return 0
        })
        .catch((err) => {
            return err
        });
}

router.post('/register', async(req, res) => {
    let id = await lastId(`${process.env.QCC_PREFIX}_m_users`, 'id')
    let encPass = await security.encryptPassword(req.body.password)
    let q = `INSERT INTO 
      ${process.env.QCC_PREFIX}_m_users
      (id, name,noreg,password, instance) 
      VALUES
      (${id}, '${req.body.name}', '${req.body.noreg}', '${encPass}', '${req.body.instance}')`
    await cmdMultipleQuery(q)
        .then((result) => {
            res.status(201).json({
                message: 'Success To add User'
            })
        })
        .catch((err) => {
            console.log(err.code);
            res.status(500).json({
                message: `${err.code == 'ER_DUP_ENTRY' ? 'User sudah terregistrasi' : err.code}`,
                err: err.response
            })
        });
})

router.get('/verify', async(req,res) => {
    try {
        let userDataVerify = jwt.verify(req.query.uid, process.env.SECRET_KEY)
        console.log(userDataVerify);
        if(userDataVerify.is_admin === 1) {
            response.success(res, 'Kamu adalah admin =)')
            return
        }
        response.error(res, 'Kamu tidak memiliki akses ke sini')
    } catch (error) {
        response.error(res, 'Kamu tidak memiliki akses ke sini')
    }
})

router.post('/login', async(req, res) => {
    try {
        let q = `SELECT * FROM ${process.env.QCC_PREFIX}_m_users WHERE noreg = '${req.body.noreg}'`
        await cmdMultipleQuery(q)
            .then(async(result) => {
                let user = result[0]
                const is_pass_correct = await security.decryptPassword(req.body.password, user.password)
                console.log(is_pass_correct);
                if (is_pass_correct) {
                    const token = await auth.generateToken(user)
                    response.success(res, 'success to login', { token })
                    return
                }
                response.failed(res, 'Noreg / password salah')
            })
    } catch (error) {
        console.log(error);
        response.failed(res, `Noreg / password salah`)
    }
})

router.get('/types', async(req, res) => {
    try {
        let q = `SELECT * FROM ${process.env.QCC_PREFIX}_m_types`
        await cmdMultipleQuery(q)
        .then(result => {
            response.success(res, 'success to get types', result)
        })
    } catch (error) {
        response.failed(res, `Failed to get types`)
    }
})

router.get('/img', async(req, res) => {
    const path = req.query.path
    if (fs.existsSync(path)) {
        // res.contentType("images");
        fs.createReadStream(path).pipe(res)
    } else {
        res.status(500)
        console.log('File not found')
        res.send('File not found')
    }
})

router.get('/dashboard', async(req, res) => {
    try {
        let q = `SELECT * FROM ${process.env.QCC_PREFIX}_r_posts WHERE type_id = ${req.query.type_id}`
        const posts = await cmdMultipleQuery(q)
        // GET LIKE & COMMENT CALC
        const mapLikeCommentCount = await posts.map(async post => {
            let like_count = await cmdMultipleQuery(`SELECT COUNT(id) as like_ct FROM ${process.env.QCC_PREFIX}_r_post_likes WHERE post_id = ${post.post_id}`)
            let comment_count = await cmdMultipleQuery(`SELECT COUNT(id) as cmt_ct FROM ${process.env.QCC_PREFIX}_r_post_comments WHERE post_id = ${post.post_id}`)
            post.like_ct = like_count[0].like_ct
            post.comment_ct = comment_count[0].cmt_ct
            return post
        })
        const waitResPost = await Promise.all(mapLikeCommentCount)
        response.success(res, 'success', waitResPost)
    } catch (error) {
        response.failed(res, `Failed to get Dashboard`)
    }
})

router.get('/submission/detail', async(req, res) => {
    try {
        const {post_id} = req.query
        let q = `SELECT post_id,title,pdf_file,type_id FROM ${process.env.QCC_PREFIX}_r_posts WHERE post_id = ${post_id} LIMIT 1`
        let post = await cmdMultipleQuery(q)
        let qComments = `SELECT qrpc.*, qmu.name, qmu.instance FROM qcc_r_post_comments qrpc
        JOIN qcc_m_users qmu
            ON qrpc.user_id = qmu.id
        WHERE post_id = ${post_id}`
        let comments = await cmdMultipleQuery(qComments)
        post[0].comments = comments
        console.log(comments);
        
        response.success(res, 'Success', post[0])
    } catch (error) {
        response.failed(res, `Failed to post submission`)
    }
})

router.post('/submission/comment', async(req, res) => {
    try {
        // CHECK LIKE USER ID ALREADY LIKE WITH THE SAME TYPE?
        let {uid, tid} = req.query
        let {post_id, comment} = req.body
        let userDataVerify = jwt.verify(uid, process.env.SECRET_KEY)
        console.log('mass');
        
        let checkQLike = `SELECT id FROM ${process.env.QCC_PREFIX}_r_post_comments WHERE user_id = '${userDataVerify.id}' AND type_id = ${tid}`
        let user = await cmdMultipleQuery(checkQLike)
        const userNotYetLike = user.length === 0
        
        if(userNotYetLike && userDataVerify) {
            let id = await lastId(`${process.env.QCC_PREFIX}_r_post_comments`, 'id')
            let instQ = `INSERT INTO ${process.env.QCC_PREFIX}_r_post_comments
            (id, user_id, post_id, type_id, comments)
            VALUES
            (${id}, ${userDataVerify.id}, ${post_id}, ${tid}, '${comment}')`
            await cmdMultipleQuery(instQ)
            response.success(res, 'success to comment post')
            return 
        } else {
            throw 'User already comment'
        }
    } catch (error) {
        response.failed(res, `You already comment POST in this category`)
    }
})

router.post('/submission/like', async(req, res) => {
    try {
        // CHECK LIKE USER ID ALREADY LIKE WITH THE SAME TYPE?
        let {uid, tid, pid} = req.query
        let userDataVerify = jwt.verify(uid, process.env.SECRET_KEY)

        let checkQLike = `SELECT id FROM ${process.env.QCC_PREFIX}_r_post_likes WHERE user_id = '${userDataVerify.id}' AND type_id = ${tid}`
        let user = await cmdMultipleQuery(checkQLike)
        const userNotYetLike = user.length === 0
        
        if(userNotYetLike && userDataVerify) {
            let id = await lastId(`${process.env.QCC_PREFIX}_r_post_likes`, 'id')
            let instQ = `INSERT INTO ${process.env.QCC_PREFIX}_r_post_likes
            (id, user_id,post_id, type_id)
            VALUES
            (${id}, ${userDataVerify.id}, ${pid}, ${tid})`
            let succes = await cmdMultipleQuery(instQ)
            if(succes) {
                return response.success(res, 'success to like post')
            }
            throw 'USer already like'
        } else {
            throw 'USer already like'
        }
    } catch (error) {
        response.failed(res, `You already like POST in this category`)
    }
})

router.post('/submission', upload.array('attach'), async(req, res) => {
    try {
        if(req.files.length > 0) {
            let {type_id, title} = req.body
            let id = await lastId(`${process.env.QCC_PREFIX}_r_posts`, 'post_id')
            const banner = `${req.files[0].path}`
            const pdf_file = `${req.files[1].path}`
            let q = `INSERT INTO ${process.env.QCC_PREFIX}_r_posts
            (post_id, type_id, title, banner, pdf_file) VALUES
            (${id}, '${type_id}', '${title}', '${banner}', '${pdf_file}')`
            await cmdMultipleQuery(q)
            .then(result => {
                response.success(res, 'success to post submission', result)
            })
        }
    } catch (error) {
        response.failed(res, `Failed to post submission`)
    }
})

module.exports = router