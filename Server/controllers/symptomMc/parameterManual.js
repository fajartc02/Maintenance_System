const cmdMultipleQuery = require('../../config/MultipleQueryConnection');
const checkSeverity = require('../../rules/checkSeverity')

function gettingSuccess(res, data) {
    res.status(200).json({
        message: 'OK',
        data
    })

}

function gettingError(res, err) {
    res.status(200).json({
        message: 'Err',
        err
    })

}

module.exports = {
        insertParam: (req, res) => {
            let { id_m_machine, id_m_parameter, clock, value, upper_limit, lower_limit } = req.body
            console.log(res.locals.data);
            let checkIdSev = checkSeverity(upper_limit, lower_limit, value)
            console.log(checkIdSev);
            let q = `INSERT INTO 
            o_history_parameter_value 
            (id_m_machine, id_m_parameter, id_m_severity, clock, value) 
                VALUES 
            (${id_m_machine}, ${id_m_parameter}, ${checkIdSev}, '${clock}', ${value})`
            cmdMultipleQuery(q)
                .then(result => {
                    gettingSuccess(res, result)
                    res.end()
                })
                .catch(err => {
                    gettingError(res, err)
                    res.end()
                })
        },
        getParameterList: (req, res) => {
            let q = `SELECT * FROM v_machine_parameter`
            let keyCol = Object.keys(req.query)[0] ? Object.keys(req.query)[0] : ''
            if (keyCol != 'filterQuery' && keyCol != '') {
                console.log(keyCol);
                q += ` WHERE ${keyCol} = '${req.query[keyCol]}'`
            }
            if (req.query.filterQuery) {
                q += ` ${req.query.filterQuery}`
            }
            cmdMultipleQuery(q)
                .then(result => {
                    gettingSuccess(res, result)
                    res.end()
                    console.log(result);
                })
                .catch(err => {
                    gettingError(res, err)
                    res.end()
                    console.log(err);
                })
        },
        getMachineParameter: (req, res) => {
            let q = `SELECT DISTINCT id_machine, mc_name, upper_limit, lower_limit FROM v_machine_parameter GROUP BY id_machine`
            cmdMultipleQuery(q)
                .then(result => {
                    gettingSuccess(res, result)
                    res.end()
                    console.log(result);
                })
                .catch(err => {
                    gettingError(res, err)
                    res.end()
                    console.log(err);
                })
        },
        getDataHistoryParam: (req, res) => {
            let q = `SELECT * FROM v_parameter_log`
            if (req.query.filterQuery) {
                q += ` ${req.query.filterQuery}`
            }
            cmdMultipleQuery(q)
                .then(result => {
                    gettingSuccess(res, result)
                    res.end()
                    console.log(result);
                })
                .catch(err => {
                    gettingError(res, err)
                    res.end()
                    console.log(err);
                })
        },
        getListParameterMcs: (req, res) => {
            // SELECT * FROM u5364194_smartand_tmmin3_qmms.v_machine_parameter group by id_parameter;
            // SELECT * FROM u5364194_smartand_tmmin3_qmms.v_machine_parameter where id_parameter = 1;
            let qGroup = `SELECT * FROM u5364194_smartand_tmmin3_qmms.v_machine_parameter group by id_parameter`
            if (req.query.filterByParamId) {
                let idSelectedParam = req.query.filterByParamId
                let qMcList = `SELECT id_machine,mc_name FROM u5364194_smartand_tmmin3_qmms.v_machine_parameter where id_parameter = ${idSelectedParam}`
                    // console.log(qMcList);
                console.log(qMcList);
                return cmdMultipleQuery(qMcList)
                    .then(resultMc => {
                        console.log(resultMc);
                        // item.machines = resultMc
                        // console.log(item);
                        gettingSuccess(res, resultMc)

                        return resultMc
                    })
                    .catch(err => {
                        console.log(err);
                        // machines = []
                        gettingError(res, err)
                    })
            } else {
                cmdMultipleQuery(qGroup)
                    .then(result => {
                        console.log(result);
                        let newArrRes = []
                        let newRes = (callback) => result.map((item, i) => {
                            let qMcList = `SELECT id_machine,mc_name FROM u5364194_smartand_tmmin3_qmms.v_machine_parameter where id_parameter = ${item.id_parameter}`
                                // console.log(qMcList);
                            return cmdMultipleQuery(qMcList)
                                .then(resultMc => {
                                    // console.log(resultMc);
                                    item.machines = resultMc
                                        // console.log(item);
                                    callback(item)
                                    return item
                                })
                                .catch(err => {
                                    // console.log(err);
                                    item.machines = []
                                    callback(item)
                                    return item
                                })
                        })
                        newRes(function(resultMap) {
                                console.log(resultMap);
                                newArrRes.push(resultMap)
                                if (newArrRes.length == result.length) {
                                    gettingSuccess(res, newArrRes)
                                }
                            })
                            // console.log(newRes);
                            // console.log(newArrRes);
                    })
                    .catch(err => {
                        gettingError(res, err)
                    })
            }
        },
        getAdminParam: (req, res) => {
            let q = `SELECT * FROM m_parameter`
            cmdMultipleQuery(q)
                .then(result => {
                    gettingSuccess(res, result)
                })
                .catch(err => {
                    gettingError(res, err)
                })
        },
        insertAdminParam: (req, res) => {
                let { name, methode_check, total_mp, std_duration, units, upper_limit, lower_limit, created_by, updated_by } = req.body
                let qCheck = `SELECT name FROM m_parameter WHERE name = '${name}'`
                let qInsert = `INSERT INTO m_parameter(
            name, 
            methode_check, 
            total_mp, 
            std_duration, 
            units, 
            upper_limit, 
            lower_limit, 
            created_by, 
        updated_by) VALUES (
            '${name}',
            '${methode_check}',
            '${total_mp}',
            '${std_duration}',
            '${units}',
            ${upper_limit != 'null' ? `'${upper_limit}'` : `NULL`},
            ${lower_limit != 'null' ? `'${lower_limit}'` : `NULL`},
            '${created_by}',
            '${updated_by}'
        )`
        cmdMultipleQuery(qCheck)
            .then(resultCheck => {
                console.log(resultCheck);
                if (resultCheck.length == 0) {
                    console.log(qInsert);
                    cmdMultipleQuery(qInsert)
                        .then(result => {
                            gettingSuccess(res, result)
                        })
                        .catch(err => {
                            gettingError(res, err)
                        })
                } else {
                    gettingError(res, 'Parameter Sudah ada')
                }
            })
            .catch(err => {
                console.log(err);
                gettingError(res, err)
            })
    },
    deleteParameter: (req, res) => {
        let q = `DELETE FROM m_parameter WHERE fid = ${req.params.fid}`
        console.log(q);
        cmdMultipleQuery(q)
            .then((result) => {
                gettingSuccess(res, result)
            }).catch((err) => {
                gettingError(res, err)
            });
    },
    addParamToMc: (req, res) => {
        let { machines, id_m_parameter, created_by, updated_by } = req.body
        console.log(req.body);
        let q = `INSERT INTO m_machine_parameter(id_m_machine, id_m_parameter, created_by)`
        let containerVals = []
        machines.forEach(item => {
            containerVals.push(`('${item}', '${id_m_parameter}','${created_by}')`)
        })
        q += ' VALUES ' + containerVals.join(',')
        console.log(q);
        cmdMultipleQuery(q)
            .then(result => {
                console.log(result);
                gettingSuccess(res, result)
            })
            .catch(err => {
                console.log(err);
                gettingError(res, err)
            })
    },
    monitoringParamDashboard: (req, res) => {
        let q = `SELECT * FROM u5364194_smartand_tmmin3_qmms.v_machine_parameter group by id_parameter`
        cmdMultipleQuery(q)
            .then(async result => {
                console.log(result);
                console.log(result.length);
                let containerVal = []
                let newRes = (callback) => result.map((item, i) => {
                    let qHistoryLast = `SELECT * FROM v_parameter_log WHERE id_param = '${item.id_parameter}' GROUP BY id_mc ORDER BY clock DESC `
                    cmdMultipleQuery(qHistoryLast)
                        .then(res => {
                            // console.log(res);
                            if (res.length > 0) {
                                item.machines = res
                                // callback(item)
                                // return item
                            } else {
                                item.machines = []
                                // callback(item)
                                // return item
                            }
                            console.log(item);
                            containerVal.push(item)
                            if (i == result.length - 1) {
                                callback(containerVal)
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        })
                })
                console.log('THIS CONTAINER VAL');
                newRes(function (resultMap) {
                    console.log(resultMap);
                    gettingSuccess(res, resultMap)
                })

            })
            .catch(err => {
                console.log(err);
                gettingError(res, err)
            })
    }
}