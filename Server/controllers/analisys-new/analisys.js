const cmdMultipleQuery = require('../../config/MultipleQueryConnection');


module.exports = {
    addAnalisysNew: (req, res) => {
        cmdMultipleQuery(`SELECT id from o_analisys where id_problem = ${req.params.v_}`)
            .then((result) => {
                console.log(result)
                if (result.length > 0) {
                    cmdMultipleQuery(`UPDATE o_analisys SET json_string = '${JSON.stringify(req.body)}' where id_problem = ${req.params.v_}`)
                } else {
                    cmdMultipleQuery(`INSERT INTO o_analisys(id_problem, json_string, analisys_category) VALUES (${req.params.v_}, '${JSON.stringify(req.body)}', 'TERJADI')`)
                }
            }).catch((err) => {
                console.log(err)
            });
    },
    getAnalisysNew: (req, res) => {
        cmdMultipleQuery(`SELECT json_string from o_analisys where id_problem = ${req.params.v_}`)
            .then((result) => {
                console.log(result)
                res.status(200).json({
                    message: 'success',
                    data: result
                })
            }).catch((err) => {
                console.log(err)
                res.status(500).json({
                    message: 'Error',
                    err
                })
            });
    }
}