const pool = require('../config/MysqlConnection');


function gettingError(res, err) {
    res.status(203).json({
        message: 'Error',
        err
    })
}
module.exports = {
    getTemperature: (req, res) => {
        console.log('temperatur run');
        // let q = `SELECT falias_temp_name AS f1, fvalue_01 AS fval , TIMESTAMPDIFF(second , fupdate , NOW()) as fdiff FROM tb_temperature where fmc_name = 'IKDM-001'`
        const { machine, param } = req.query
        let q = `SELECT fvalue_01 AS fval , fmc_name, fupdate, ftemp_name FROM tb_temperature_log where fmc_name = '${machine}' AND DATE(fupdate) = DATE(NOW()) AND ftemp_name LIKE '%${param}%' ORDER BY fupdate DESC limit 20`
        pool.getConnection(function(err, conn) {
            if (err) {
                gettingError(res, err)
            }
            conn.query(q, function(err, results) {
                if (err) {
                    gettingError(res, err)
                }
                res.status(200).json({
                    message: 'paramters',
                    data: results
                })
                conn.release()
            })
        })
    },
    getParameterName: (req, res) => {
        console.log('paramname run');
        // let q = `SELECT falias_temp_name AS f1, fvalue_01 AS fval , TIMESTAMPDIFF(second , fupdate , NOW()) as fdiff FROM tb_temperature where fmc_name = 'IKDM-001'`
        // const { machine, param } = req.query.
        let q = `SELECT DISTINCT ftemp_name FROM tb_temperature`
        pool.getConnection(function(err, conn) {
            if (err) {
                gettingError(res, err)
            }
            conn.query(q, function(err, results) {
                if (err) {
                    gettingError(res, err)
                }
                res.status(200).json({
                    message: 'name params',
                    data: results
                })
                conn.release()
            })
        })
    },
    getAvailableMc: (req, res) => {
        let q = `SELECT DISTINCT fmc_name FROM tb_temperature`
        pool.getConnection((err, connection) => {
            if (err) {
                gettingError(res, err)
            }
            connection.query(q, (err, results) => {
                if (err) {
                    gettingError(res, err)
                }
                res.status(200).json({
                    message: 'Success get Available MC',
                    data: results
                })
                connection.release()
            })
        })
    }
}