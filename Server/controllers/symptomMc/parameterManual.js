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
            let { id_m_machine, id_m_parameter, clock, value, upper_limit = null, lower_limit = null, warning_ul = null, warning_ll = null, id_m_sev = null } = req.body
                // console.log(res.locals.data);
                // let checkIdSev = checkSeverity(upper_limit, lower_limit, value, warning_ul, warning_ll)
                // console.log(checkIdSev);
            let q = `INSERT INTO 
            o_history_parameter_value 
            (id_m_machine, id_m_parameter, id_m_severity, clock, value) 
                VALUES 
            (${id_m_machine}, ${id_m_parameter}, ${id_m_sev}, '${clock}', ${value})`
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
                q += ` ${req.query.filterQuery} AND value > 0`
            }
            q += ` ORDER BY clock DESC`
                // console.log(q);
            cmdMultipleQuery(q)
                .then(result => {
                    // console.log(result);
                    gettingSuccess(res, result)
                        // res.end()
                })
                .catch(err => {
                    gettingError(res, err)
                        // res.end()
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
                // console.log(result);
                // console.log(result.length);
                let containerVal = []
                let newRes = (callback) => result.map((item, i) => {
                    let qHistoryLast = `SELECT * FROM v_parameter_log WHERE id_param = '${item.id_parameter}' GROUP BY id_mc ORDER BY clock DESC `
                    cmdMultipleQuery(qHistoryLast)
                        .then(res => {
                            console.log(res);
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
    },
    machinesDashboard: (req, res) => {
        let containerQuery = []
        console.log('dashboard/machines Still processing ....');
        let qMcAssy = `
        SELECT tbmc.fid AS id_mc, tbmc.fline AS fline, tbmc.fmc_name AS mc_name, mp.name, ohpv.clock AS clock, ohpv.value AS value, msev.fname AS severity FROM tb_mc tbmc
            LEFT JOIN m_machine_parameter mmp
                ON tbmc.fid = mmp.id_m_machine
            LEFT JOIN m_parameter mp
                ON mmp.id_m_parameter = mp.fid
            LEFT JOIN o_history_parameter_value ohpv
                ON ohpv.id_m_machine = tbmc.fid
            LEFT JOIN m_severity msev
                ON msev.fid = ohpv.id_m_severity WHERE fline = 'ASSY LINE' AND mp.name IS NOT NULL ORDER BY id_mc DESC LIMIT 100`
        let qMcCb = `
        SELECT tbmc.fid AS id_mc, tbmc.fline AS fline, tbmc.fmc_name AS mc_name, mp.name, ohpv.clock AS clock, ohpv.value AS value, msev.fname AS severity FROM tb_mc tbmc
            LEFT JOIN m_machine_parameter mmp
                ON tbmc.fid = mmp.id_m_machine
            LEFT JOIN m_parameter mp
                ON mmp.id_m_parameter = mp.fid
            LEFT JOIN o_history_parameter_value ohpv
                ON ohpv.id_m_machine = tbmc.fid
            LEFT JOIN m_severity msev
                ON msev.fid = ohpv.id_m_severity WHERE fline LIKE '%BLOCK' AND mp.name IS NOT NULL ORDER BY id_mc DESC LIMIT 100`
        let qMcCh = `
        SELECT tbmc.fid AS id_mc, tbmc.fline AS fline, tbmc.fmc_name AS mc_name, mp.name, ohpv.clock AS clock, ohpv.value AS value, msev.fname AS severity FROM tb_mc tbmc
            LEFT JOIN m_machine_parameter mmp
                ON tbmc.fid = mmp.id_m_machine
            LEFT JOIN m_parameter mp
                ON mmp.id_m_parameter = mp.fid
            LEFT JOIN o_history_parameter_value ohpv
                ON ohpv.id_m_machine = tbmc.fid
            LEFT JOIN m_severity msev
                ON msev.fid = ohpv.id_m_severity WHERE fline LIKE '%HEAD' AND mp.name IS NOT NULL ORDER BY clock DESC LIMIT 100`
        let qMcCam = `
        SELECT tbmc.fid AS id_mc, tbmc.fline AS fline, tbmc.fmc_name AS mc_name, mp.name, ohpv.clock AS clock, ohpv.value AS value, msev.fname AS severity FROM tb_mc tbmc
            LEFT JOIN m_machine_parameter mmp
                ON tbmc.fid = mmp.id_m_machine
            LEFT JOIN m_parameter mp
                ON mmp.id_m_parameter = mp.fid
            LEFT JOIN o_history_parameter_value ohpv
                ON ohpv.id_m_machine = tbmc.fid
            LEFT JOIN m_severity msev
                ON msev.fid = ohpv.id_m_severity WHERE fline LIKE 'CAM%' ORDER BY id_mc DESC LIMIT 100`
        let qMcCr = `
        SELECT tbmc.fid AS id_mc, tbmc.fline AS fline, tbmc.fmc_name AS mc_name, mp.name, ohpv.clock AS clock, ohpv.value AS value, msev.fname AS severity FROM tb_mc tbmc
            LEFT JOIN m_machine_parameter mmp
                ON tbmc.fid = mmp.id_m_machine
            LEFT JOIN m_parameter mp
                ON mmp.id_m_parameter = mp.fid
            LEFT JOIN o_history_parameter_value ohpv
                ON ohpv.id_m_machine = tbmc.fid
            LEFT JOIN m_severity msev
                ON msev.fid = ohpv.id_m_severity WHERE fline LIKE 'Crank%' ORDER BY id_mc DESC LIMIT 100`
        let qMcLp = `
        SELECT tbmc.fid AS id_mc, tbmc.fline AS fline, tbmc.fmc_name AS mc_name, mp.name, ohpv.clock AS clock, ohpv.value AS value, msev.fname AS severity FROM tb_mc tbmc
            LEFT JOIN m_machine_parameter mmp
                ON tbmc.fid = mmp.id_m_machine
            LEFT JOIN m_parameter mp
                ON mmp.id_m_parameter = mp.fid
            LEFT JOIN o_history_parameter_value ohpv
                ON ohpv.id_m_machine = tbmc.fid
            LEFT JOIN m_severity msev
                ON msev.fid = ohpv.id_m_severity WHERE fline LIKE '%LP%' ORDER BY id_mc DESC LIMIT 100`
        let qMcHp = `
        SELECT tbmc.fid AS id_mc, tbmc.fline AS fline, tbmc.fmc_name AS mc_name, mp.name, ohpv.clock AS clock, ohpv.value AS value, msev.fname AS severity FROM tb_mc tbmc
            LEFT JOIN m_machine_parameter mmp
                ON tbmc.fid = mmp.id_m_machine
            LEFT JOIN m_parameter mp
                ON mmp.id_m_parameter = mp.fid
            LEFT JOIN o_history_parameter_value ohpv
                ON ohpv.id_m_machine = tbmc.fid
            LEFT JOIN m_severity msev
                ON msev.fid = ohpv.id_m_severity WHERE fline LIKE '%HP%' ORDER BY id_mc DESC LIMIT 100`
        containerQuery.push(qMcAssy)
        containerQuery.push(qMcCh)
        containerQuery.push(qMcCb)
        containerQuery.push(qMcCam)
        containerQuery.push(qMcCr)
        containerQuery.push(qMcLp)
        containerQuery.push(qMcHp)
        cmdMultipleQuery(containerQuery.join(';'))
            .then(async (result) => {
                // console.log(result);
                let arrRes = []
                let mapResult = await result.map((item, i) => {
                    // item[0].totalMc = item.length
                    let obj = {
                        name: item[0].fline.toUpperCase(),
                        machines: item,
                        totalMc: item.length
                    }
                    arrRes.push(obj)
                    if (i == 0) {
                        return arrRes
                    }
                })
                let count = 0
                let idxSaved = null
                let mapResWarning = await mapResult[0].map((item, i) => {
                    let arrMc = []
                    item.machines.forEach((mc, idxMc) => {
                        if (mc.severity == 'WARNING') {
                            // console.log(i);
                            // console.log(mc);
                            // console.log(item.machines);
                            // console.log(mc);


                            if (arrMc.findIndex((elem => elem.id_mc == mc.id_mc)) == -1) {
                                count += 1
                            }
                            arrMc.push(mc)
                            let checkLast = item.machines.filter(item => {
                                return item.mc_name == mc.mc_name && item.name == mc.name
                            })
                            console.log(checkLast[checkLast.length - 1]);
                            if (checkLast[checkLast.length - 1].severity == 'OK') {
                                count = 0
                            }

                        }

                    })
                    item.warnCount = count
                    item.warnMc = arrMc
                    // console.log(item);
                    if (idxSaved != i) {
                        count = 0
                        idxSaved = i
                    }
                    return item
                })
                let countOk = 0
                let idxSavedOk = null
                let mapResOK = await mapResWarning.map((item, i) => {
                    let arrMc = []
                    item.machines.forEach(mc => {
                        if ((mc.severity == 'OK' || mc.severity == null)) {
                            // console.log(mc);
                            if (arrMc.findIndex((elem => elem.id_mc == mc.id_mc)) == -1) {
                                countOk += 1
                            }
                            arrMc.push(mc)
                        }
                    })
                    item.okCount = countOk
                    item.okMc = arrMc
                    // console.log(item);
                    if (idxSavedOk != i) {
                        countOk = 0
                        idxSavedOk = i
                    }
                    return item
                })
                let countNg = 0
                let idxSavedNg = null
                let mapResNg = await mapResOK.map((item, i) => {
                    let arrMc = []
                    item.machines.forEach(mc => {
                        if (mc.severity == 'NG') {
                            // console.log(mc);

                            if (arrMc.findIndex((elem => elem.id_mc == mc.id_mc)) == -1) {
                                countNg += 1
                            }
                            arrMc.push(mc)
                        }

                    })
                    item.ngCount = countNg
                    item.ngMc = arrMc
                    // console.log(item);
                    if (idxSavedNg != i) {
                        countNg = 0
                        idxSavedNg = i
                    }
                    return item
                })
                // res.send(mapResNg)
                await gettingSuccess(res, mapResNg)
            }).catch((err) => {
                console.log(err)
                // res.send(err)
                gettingSuccess(res, err)
            });
    },
    parameterAlertHistory: (req, res) => {
        let q = `SELECT * FROM u5364194_smartand_tmmin3_qmms.v_parameter_log WHERE (severity = 'WARNING' OR severity = 'NG')`
        let { startDate, endDate } = req.query
        if (startDate && endDate) {
            q += ` AND TIMESTAMP(clock) >= '${req.query.startDate} 00:00:00' AND TIMESTAMP(clock) <= '${req.query.endDate} 23:59:59'`
            // q += ` AND clock BETWEEN '${req.query.startDate} 00:00:00' AND clock '${req.query.endDate} 23:59:59'`
        }
        q += `LIMIT 1`
        console.log(q);
        cmdMultipleQuery(q)
            .then((result) => {
                console.log(result);
                gettingSuccess(res, result)
            }).catch((err) => {
                gettingError(res, err)
            });
    },
    countAlertHistory: (req, res) => {
        let q = `SELECT * FROM o_history_parameter_value WHERE id_m_severity = 2 OR id_m_severity = 3`
        let { startDate, endDate } = req.query
        if (startDate && endDate) {
            q += ` AND TIMESTAMP(clock) >= '${req.query.startDate} 00:00:00' AND TIMESTAMP(clock) <= '${req.query.endDate} 23:59:59'`
            // q += ` AND clock BETWEEN '${req.query.startDate} 00:00:00' AND clock '${req.query.endDate} 23:59:59'`
        }
        q += ` ORDER BY fid ASC LIMIT 1`
        console.log(q);
        cmdMultipleQuery(q)
            .then((result) => {
                console.log(result);
                gettingSuccess(res, result)
            }).catch((err) => {
                gettingError(res, err)
            });
    }
}