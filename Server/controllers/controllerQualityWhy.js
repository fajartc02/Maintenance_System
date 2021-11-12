const cmdMultipleQuery = require('../config/MultipleQueryConnection')

module.exports = {
    addAnalisys: (req, res) => {
        let containerColName = []
        let containerValue = []
        console.log(req.body);
        for (const key in req.body) {
            const element = req.body[key];
            console.log(element);
            containerColName.push(key)
            containerValue.push(`'${element}'`)
            let q = `INSERT INTO tb_quality_analisys 
                (${containerColName.join(',')})
                    VALUES
                (${containerValue.join(',')})`
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
}