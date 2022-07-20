const { cmdMultipleQuery } = require('../functions/index')

module.exports = {
    inputRqData: (req, res) => {
        let containerCol = []
        let containerVals = []
        let body_data = req.body
        for (const key in body_data) {
            const element = body_data[key];
            containerCol.push(key)
            containerVals.push(`'${element}'`)
        }
        let q = `INSERT INTO tr_time_rq_report 
            (${containerCol.join(',')})
            VALUES
            (${containerVals.join(',')})`
        console.log(q);
        cmdMultipleQuery(q)
            .then((result) => {
                res.status(201).json({
                    message: 'ok',
                    data: result
                })
            }).catch((err) => {
                res.status(500).json({
                    message: 'Error',
                    err
                })
            });
    },
    getRqData: (req, res) => {
        let _id = req.params._id
        let q = `SELECT * FROM tr_time_rq_report WHERE id_tr_time_output_report = ${_id}`

        console.log(q);
        cmdMultipleQuery(q)
            .then((result) => {
                res.status(200).json({
                    message: 'success',
                    data: result
                })
            }).catch((err) => {
                res.status(500).json({
                    message: 'Error',
                    err: err
                })
            });
    },
}