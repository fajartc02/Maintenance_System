const cmdMultipleQuery = require('../config/MultipleQueryConnection')

module.exports = {
    addAnalisys: (req, res) => {
        let containerColName = []
        let containerValue = []
        let q;
        for (const key in req.body) {
            const element = req.body[key];
            containerColName.push(key)
            containerValue.push(`'${element}'`)
             q = `INSERT INTO tb_quality_analisys 
                (${containerColName.join(',')})
                    VALUES
                (${containerValue.join(',')})`
        }
        console.log(q);
        cmdMultipleQuery(q)
        .then(result => {
            res.status(201).json({
                message: 'ok',
                data: result
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'err',
                err
            })
        })
    },
    getAnalisys: (req, res) => {
        let q = `SELECT * FROM tb_quality_analisys WHERE fid_quality = ${req.query.fid_quality}`
        cmdMultipleQuery(q)
            .then(result => {
                res.status(200).json({
                    message: 'ok',
                    data: result
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: 'err',
                    err
                })
            })
    },
    editAnalisys: (req, res) => {
        let data = req.body
        let containerFields = []
        for (const key in data) {
            const element = data[key]
            
            if(key != 'isEdit') {
                if(key != 'fupdate') {
                    containerFields.push(`${key} = '${element}'`)
                } else {
                    containerFields.push(`${key} = CURRENT_TIMESTAMP()`)
                }
            }
            
        }
        let q = `UPDATE tb_quality_analisys SET ${containerFields.join(',')} WHERE fid = ${req.params.v_}`
        console.log(q);
        cmdMultipleQuery(q) 
            .then(result => {
                res.status(201).json({
                    message: 'ok',
                    data: result
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: 'err',
                    err
                })
            })
    },
    removeAnalisys: (req, res) => {
        let q = `DELETE FROM tb_quality_analisys WHERE fid = ${req.params.v_}`
        cmdMultipleQuery(q)
        .then(result => {
            res.status(201).json({
                message: 'ok',
                data: result
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'err',
                err
            })
        })
    }
}