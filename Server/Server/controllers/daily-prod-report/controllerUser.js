const cmdMultipleQuery = require('../../config/MultipleQueryConnection')

module.exports = {
    login: (req, res) => {
        let { email, password } = req.body
        let q = `SELECT 
            * 
        FROM tb_mt_member
            WHERE
            fnoreg = '${email}' AND 
            fwa_no LIKE '%${password}%'`
        console.log(q);
        cmdMultipleQuery(q)
            .then((result) => {
                console.log(result);
                if (result.length > 0) {
                    res.status(201).json({
                        message: 'ok',
                        data: result
                    })
                } else {
                    res.status(401).json({
                        data: {
                            errors: 'Email Atau Password salah broooo!'
                        }
                    })
                }
            }).catch((err) => {
                res.status(500).json({
                    message: 'ok',
                    err
                })
            });
    }
}