const pool = require('../config/MysqlConnection');

function gettingError(res, err) {
    res.status(203).json({
        message: 'Error',
        err: err
    })
}

module.exports = {
    addNewMachine: (req, res) => {
        let qAddNewMachine = `INSERT INTO tb_mc 
            (fmc_name, fline, fop_desc, fmaker) 
        VALUES
            ('${req.body.machine}', '${req.body.selectedLine}', '${req.body.process}', '${req.body.maker}')`
        pool.getConnection(async function(err, conn) {
            if (err) {
                gettingError(res, err)
            }
            conn.query(qAddNewMachine, function(err, results) {
                if (err) {
                    gettingError(res, err)
                }
                res.status(201).json({
                    message: 'Success to add new Machine',
                    data: results
                })
                conn.release()
            })
        })
    }
}