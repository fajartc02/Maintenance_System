const cmdQuery = require('../config/MysqlConnection');
const pool = require('../config/MysqlConnection');
const cmdMultipleQuery = require('../config/MultipleQueryConnection');



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
        const { machine, param, isInverter } = req.query;
        // let q = `SELECT fvalue_01 AS fval , fmc_name, fupdate, ftemp_name FROM tb_temperature_log where fmc_name = '${machine}' AND DATE(fupdate) = DATE(NOW()) AND ftemp_name LIKE '%${param}%' ORDER BY fupdate DESC limit 20`
        // console.log(req.query.containerQuery);
        cmdMultipleQuery(req.query.containerQuery)
            .then((results) => {
                if (results[0].length > 0) {
                    let mapRes = results.filter(item => {
                        if (item.length > 0) {
                            return item
                        }
                    })
                    res.status(200).json({
                        message: 'paramters',
                        data: mapRes
                    })
                } else {
                    res.status(200).json({
                        message: 'paramters',
                        data: results
                    })
                }

            }).catch((err) => {
                gettingError(res, err)
            });
    },
    getParameterName: (req, res) => {
        console.log('paramname run'); //
        // let q = `SELECT falias_temp_name AS f1, fvalue_01 AS fval , TIMESTAMPDIFF(second , fupdate , NOW()) as fdiff FROM tb_temperature where fmc_name = 'IKDM-001'`
        const { machines } = req.query
        let q = `SELECT DISTINCT ftemp_name FROM tb_temperature WHERE `
        console.log(machines);
        if (machines.includes(',')) {
            let arrMcs = machines.split(',');
            for (let i = 0; i < arrMcs.length; i++) {
                const element = arrMcs[i];
                q += `fmc_name = '${element}'`
                if (i < arrMcs.length - 1) {
                    q += ` OR `
                }
            }
        } else {
            q += `fmc_name = '${machines}'`
        }
        q += `ORDER BY ftemp_name ASC`
        console.log(q);
        // console.log(req.query);
        cmdMultipleQuery(q)
            .then((results) => {
                res.status(200).json({
                    message: 'name params',
                    data: results
                })
            }).catch((err) => {
                gettingError(res, err)
            });
    },
    getAvailableMc: (req, res) => {
        let q = `SELECT DISTINCT fmc_name FROM tb_temperature ORDER BY fmc_name ASC`
        cmdMultipleQuery(q)
            .then((results) => {
                res.status(200).json({
                    message: 'Success get Available MC',
                    data: results
                })
            }).catch((err) => {
                gettingError(res, err)
            });
    },
    getInverterData: (req, res) => {
        let q = ``
        if (req.query.selectedParam.includes(",")) {
            let params = req.query.selectedParam.split(',')
            for (let i = 0; i < params.length; i++) {
                const param = params[i];
                let tempQ = `SELECT * FROM tb_params_inverter_log WHERE 
                DATE(fupdate) > DATE('${req.query.selectedStartDate}') AND
                DATE(fupdate) < DATE('${req.query.selectedEndDate}') AND
                fparamName = '${param}'
            LIMIT 100`
                q += tempQ
                q += ';'
            }
        } else {
            q = `SELECT * FROM tb_params_inverter_log WHERE 
            DATE(fupdate) > DATE('${req.query.selectedStartDate}') AND
            DATE(fupdate) < DATE('${req.query.selectedEndDate}') AND
            fparamName = '${req.query.selectedParam}'
        LIMIT 100`
        }
        let qNameParamInv = `SELECT DISTINCT fparamName FROM tb_params_inverter_log`
        cmdMultipleQuery(q)
            .then((result) => {
                res.status(200).json({
                    message: 'Success to get inverter data',
                    data: result
                })
            }).catch((err) => {
                res.status(203).json({
                    message: "Error to get Inverter data",
                    err: err.message
                })
            });
    },
}