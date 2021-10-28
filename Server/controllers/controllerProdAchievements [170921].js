const credentials = require('../config/Credentials');
const dbSingleQuery = require('../config/MysqlConnection')
const mysql = require("mysql");
const cmdMultipleQuery = require('../config/MultipleQueryConnection');
// const redis = require('redis');
// const client = redis.createClient({host: 128})


// client.on("error", function(error) {
//     console.error(error);
// });
// const RedisServer = require('redis-server');

// // Simply pass the port that you want a Redis server to listen on.
// const server = new RedisServer(6379);

// server.open((err) => {
//     if (err === null) {
//         // You may now connect a client to the Redis
//         // server bound to port 6379.
//     }
//     console.log(err);
// });


function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}
module.exports = {
    getColorDash: async(req, res) => {
        console.log("MASUK FN GETCOLORDASH")
            // let arrLines = [{
            //             fline: 'ASSY LINE',
            //             falias: 'ASSY',
            //             isStop: 0,
            //             durCurrentStop: 0,
            //             output: '0/0',
            //             oee: 0,
            //             durMtCall: 0
            //         },
            //         {
            //             fline: 'LPDC',
            //             falias: 'LP',
            //             isStop: 0,
            //             durCurrentStop: 0,
            //             output: '0/0',
            //             oee: 100,
            //             durMtCall: 0
            //         },
            //         {
            //             fline: 'CYLINDER BLOCK',
            //             falias: 'CB',
            //             isStop: 0,
            //             durCurrentStop: 0,
            //             output: '0/0',
            //             oee: 100,
            //             durMtCall: 0
            //         },
            //         {
            //             fline: 'CAM SHAFT',
            //             falias: 'CAM',
            //             isStop: 0,
            //             durCurrentStop: 0,
            //             output: '0/0',
            //             oee: 100,
            //             durMtCall: 0
            //         },
            //         {
            //             fline: 'CRANK SHAFT',
            //             falias: 'CR',
            //             isStop: 0,
            //             durCurrentStop: 0,
            //             output: '0/0',
            //             oee: 100,
            //             durMtCall: 0
            //         },
            //         {
            //             fline: 'CYLINDER HEAD',
            //             falias: 'CH',
            //             isStop: 0,
            //             durCurrentStop: 0,
            //             output: '0/0',
            //             oee: 100,
            //             durMtCall: 0
            //         },
            //         {
            //             fline: 'HPDC',
            //             falias: 'DC',
            //             isStop: 0,
            //             durCurrentStop: 0,
            //             output: '0/0',
            //             oee: 100,
            //             durMtCall: 0
            //         },
            //     ]
        let arrLines = ['LPDC', 'HPDC', 'CAM SHAFT', 'CRANK SHAFT', 'CYLINDER HEAD', 'CYLINDER BLOCK', 'ASSY LINE']

        // total 0 ~ 15
        // 0 ~ 3: 
        // LPDC(0: mcActiveStop .cnt1 ; 1: durActiveStop .fdur; 2: )
        let containerQuery = ``
        for (let i = 0; i < arrLines.length; i++) {
            containerQuery += `
            SELECT fline, count(*) as cnt1 from v_mc_status WHERE fstatus = 1 AND fline LIKE '%${arrLines[i]}%' GROUP by fline;
            SELECT fline, fdur FROM v_current_error_2 WHERE fend_time IS NULL AND fline = '${arrLines[i]}' ORDER BY fdur DESC LIMIT 1;
            SELECT fline,fplan,ftarget,factual,foee from v_prod WHERE fline LIKE '%${arrLines[i]}%' order by fid;
            SELECT fline, sum(fdur) as totalLs FROM v_current_error_2 WHERE fline = '${arrLines[i]}' and (date(fstart_time) = date(now()))`
            if (i < arrLines.length - 1) {
                containerQuery += ';'
            }
        }
        // console.log(containerQuery);
        cmdMultipleQuery(containerQuery)
            .then(results => {
                let containerRes = []
                let obj = {}
                for (let i = 0; i < results.length; i++) {
                    results[i]
                    console.log(results[i]);
                    if (i < 4) {
                        obj.fline = 'LPDC'
                        obj.falias = 'LP'
                        if (results[0].length !== 0 && results[0] !== null) {
                            obj.isStop = 1
                            obj.durCurrentStop = results[1][0].fdur
                        } else {
                            obj.isStop = 0
                            obj.durCurrentStop = null
                        }
                        obj.output = `${results[2][0].factual}/${results[2][0].fplan}`
                        obj.oee = results[2][0].foee
                        if (results[3][0].fline) {
                            obj.durMtCall = results[3][0].totalLs
                        } else {
                            obj.durMtCall = 0
                        }
                        if (i == 3) {
                            containerRes.push(obj)
                            obj = {}
                        }
                    } else if (i < 8) {
                        // 4
                        obj.fline = 'HPDC'
                        obj.falias = 'DC'
                        if (results[4].length !== 0) {
                            obj.isStop = 1
                            obj.durCurrentStop = results[5][0].fdur
                        } else {
                            obj.isStop = 0
                            obj.durCurrentStop = null
                        }
                        obj.output = `${results[6][0].factual}/${results[6][0].fplan}`
                        obj.oee = results[6][0].foee
                        if (results[7][0].fline) {
                            obj.durMtCall = results[7][0].totalLs
                        } else {
                            obj.durMtCall = 0
                        }
                        if (i == 7) {
                            containerRes.push(obj)
                            obj = {}
                        }
                    } else if (i < 12) {
                        // 8
                        obj.fline = 'CAM SHAFT'
                        obj.falias = 'CAM'
                        if (results[8].length !== 0) {
                            obj.isStop = 1
                            obj.durCurrentStop = results[9][0].fdur
                        } else {
                            obj.isStop = 0
                            obj.durCurrentStop = null
                        }
                        obj.output = `${results[10][0].factual}/${results[10][0].fplan}`
                        obj.oee = results[10][0].foee
                        if (results[11][0].fline) {
                            obj.durMtCall = results[11][0].totalLs
                        } else {
                            obj.durMtCall = 0
                        }
                        if (i == 11) {
                            containerRes.push(obj)
                            obj = {}
                        }
                    } else if (i < 16) {
                        // 12
                        obj.fline = 'CRANK SHAFT'
                        obj.falias = 'CR'
                        if (results[12].length !== 0) {
                            obj.isStop = 1
                            obj.durCurrentStop = results[13][0].fdur
                        } else {
                            obj.isStop = 0
                            obj.durCurrentStop = null
                        }
                        obj.output = `${results[14][0].factual}/${results[14][0].fplan}`
                        obj.oee = results[14][0].foee
                        if (results[15][0].fline) {
                            obj.durMtCall = results[15][0].totalLs
                        } else {
                            obj.durMtCall = 0
                        }
                        if (i == 15) {
                            containerRes.push(obj)
                            obj = {}
                        }
                    } else if (i < 20) {
                        // 16
                        obj.fline = 'CYLINDER HEAD'
                        obj.falias = 'CH'
                        if (results[16].length !== 0) {
                            obj.isStop = 1
                            obj.durCurrentStop = results[17][0].fdur
                        } else {
                            obj.isStop = 0
                            obj.durCurrentStop = null
                        }
                        obj.output = `${results[18][0].factual}/${results[18][0].fplan}`
                        obj.oee = results[18][0].foee
                        if (results[19][0].fline) {
                            obj.durMtCall = results[19][0].totalLs
                        } else {
                            obj.durMtCall = 0
                        }
                        if (i == 19) {
                            containerRes.push(obj)
                            obj = {}
                        }
                    } else if (i < 24) {
                        // 20
                        obj.fline = 'CYLINDER BLOCK'
                        obj.falias = 'CB'
                        if (results[20].length !== 0) {
                            obj.isStop = 1
                            obj.durCurrentStop = results[21][0].fdur
                        } else {
                            obj.isStop = 0
                            obj.durCurrentStop = null
                        }
                        obj.output = `${results[22][0].factual}/${results[22][0].fplan}`
                        obj.oee = results[22][0].foee
                        if (results[23][0].fline) {
                            obj.durMtCall = results[23][0].totalLs
                        } else {
                            obj.durMtCall = 0
                        }
                        if (i == 23) {
                            containerRes.push(obj)
                            obj = {}
                        }
                    } else if (i < 28) {
                        // 24
                        obj.fline = 'ASSY LINE'
                        obj.falias = 'ASSY'
                        if (results[24].length !== 0) {
                            obj.isStop = 1
                            obj.durCurrentStop = results[25][0].fdur
                        } else {
                            obj.isStop = 0
                            obj.durCurrentStop = null
                        }
                        obj.output = `${results[26][0].factual}/${results[26][0].fplan}`
                        obj.oee = results[26][0].foee
                        if (results[27][0].fline) {
                            obj.durMtCall = results[27][0].totalLs
                        } else {
                            obj.durMtCall = 0
                        }
                        if (i == 27) {
                            containerRes.push(obj)
                            obj = {}
                        }
                    }
                }
                console.log(containerRes);
                // client.setex(process.env.REDIS_KEY, 3600, containerRes)
                res.status(200).json({
                    message: 'Success to get Colordash',
                    data: containerRes
                })
            })
            .catch(err => {
                console.log(err);
            })
    },
    getLines: (req, res) => {
        var q = `select * from tb_line`;
        cmdQuery(q)
            .then((results) => {
                res.status(200).json({
                    msg: 'Success to get Lines',
                    data: results
                })
            }).catch((err) => {
                res.status(203).json({
                    msg: 'Err to get Lines',
                    data: err
                })
            });
    },
    getMachines: (req, res) => {
        var q = `select * from tb_mc`;
        if (req.query.line) {
            q += ` where fline = '${req.query.line}'`
        }
        if (req.query.fmc) {
            q += `where fmc_name = '${req.query.fmc}'`
        }
        q += `ORDER BY fmc_name ASC`
        cmdQuery(q)
            .then((results) => {
                res.status(200).json({
                    msg: 'Success to get Machines',
                    data: results
                })
            }).catch((err) => {
                res.status(203).json({
                    message: 'Error Request',
                    err: err
                })
            });
    },
    getProblemsToday: (req, res) => {
        let qTodayProb = `select *, timestampdiff(minute, fstart_time , fend_time) as fdur ,
                  if((foperator is null or fshift is null or freal_prob is null or fav_categoty is null or froot_cause is null or fstep_repair is null  ),0,1) as fedit
                  from v_current_error_2 where (date(fstart_time) = date(now()) or date(fend_time) = date(now())) and timestampdiff(minute, fstart_time , fend_time) >=3 AND fline LIKE '%${req.query.fline}%'`;
        cmdQuery(qTodayProb)
            .then((results) => {
                res.status(200).json({
                    message: "Success to get All today problems",
                    data: results
                })
            }).catch((err) => {
                res.status(203).json({
                    message: 'Error Request',
                    err: err
                })
            });
    },
    getProblemsHistory: (req, res) => {
        let qProbHistory = `SELECT * FROM v_current_error_2`
        let count = 0
        if (req.query) {
            let startDate;
            let endDate;
            let qMachine = ""
            let qLine = ""
            let qProblem = ""
            for (key in req.query) {
                count++
                // console.log(formatDate(req.query[key]));
                if (key == 'startDate') {
                    startDate = formatDate(req.query[key]);
                } else if (key == 'endDate') {
                    endDate = formatDate(req.query[key]);
                }
                console.log(req.query);
                if (key == 'machine' && req.query.isProblem == 'false') {
                    if (req.query[key] != 'null') {
                        qMachine = ` and fmc_name = '${req.query[key]}'`;
                    }
                }
                if (key == 'line') {
                    qLine = ` and fline = '${req.query[key]}'`;
                }
                if (key == 'problem') {
                    qProblem = ` and ferror_name LIKE '%${req.query[key]}%'`
                }
            }
            qProbHistory += ` WHERE date(fstart_time) >= date('${startDate}')${qProblem} and date(fstart_time) <= date('${endDate}')${qMachine} ${qLine} ORDER BY fdur DESC`
            cmdQuery(qProbHistory)
                .then((results) => {
                    res.status(200).json({
                        message: 'Success to get Problem History',
                        data: results
                    })
                }).catch((err) => {
                    res.status(203).json({
                        message: 'Error Request Problem History',
                        err: err
                    })
                });
        }
    },
    getOeeLog: (req, res) => {
        let qLogOee = `SELECT AVG(fvalue) AS oee , DATE(fdate) AS date FROM tb_oee_log where MONTH(fdate) = ${req.query.month} GROUP BY DATE(fdate) order by fdate ASC`
        cmdQuery(qLogOee)
            .then((results) => {
                res.status(200).json({
                    message: "Success to get OEE Monthly",
                    data: results
                })
            }).catch((err) => {
                res.status(203).json({
                    message: 'Error Request OEE Monthly',
                    err
                })
            });
    },
    getTotalDailyProb: (req, res) => {
        let qtTotalTodayProb = `SELECT SUM(fdur) AS totalDur, fstart_time FROM v_current_error_2 WHERE MONTH(fstart_time) = ${req.query.month} GROUP BY DATE(fstart_time) order by fstart_time ASC`
        cmdQuery(qtTotalTodayProb)
            .then((results) => {
                res.status(200).json({
                    message: "Success to get Problem Monthly",
                    data: results
                })
            }).catch((err) => {
                res.status(203).json({
                    message: 'Error Request Problem Monthly',
                    err
                })
            });
    },
    getParetoProblem: (req, res) => {
        let startDate = ''
        let endDate = ''
        let fline = ''
        if (req.query.startDate) {
            startDate = `${req.query.startDate}`
        }
        if (req.query.endDate) {
            endDate = `${req.query.endDate}`
        }
        if (req.query.fline) {
            fline = `AND fline = '${req.query.fline}'`
        }
        let qProblem = `
            SELECT 
                fmc_name, 
                sum(fdur) AS fdur 
            FROM v_current_error_2 
            WHERE  
                date(fstart_time) >= date('${startDate}') AND 
                date(fstart_time) <= date('${endDate}') AND 
                fdur > 3 ${fline} 
            GROUP BY fmc_name 
            ORDER BY fdur desc LIMIT 5`
            // console.log(qProblem);
        cmdQuery(qProblem)
            .then((results) => {
                res.status(200).json({
                    message: "Success to get Pareto Problem",
                    data: results
                })
            }).catch((err) => {
                res.status(203).json({
                    message: 'Error Request',
                    err: err
                })
            });
    },
    getProbTemp: (req, res) => {
        // console.log('Get Pareto Problem RUN');
        let qProbTemp = `
            SELECT COUNT(fid) AS totalProb 
            FROM v_current_error_2 
            WHERE   
                MONTH(fstart_time) = MONTH(now()) AND 
                YEAR(fstart_time) = YEAR(now()) AND 
                fdur >= 30 AND
                fpermanet_cm = ''`
        cmdQuery(qProbTemp)
            .then((results) => {
                res.status(200).json({
                    message: "Success to get Prob Temp",
                    data: results
                })
            }).catch((err) => {
                res.status(203).json({
                    message: 'Error Request to get Prob Temp',
                    err: err
                })
            });
    },
    searchMachine: (req, res) => {
        // console.log('Get search machines');
        let qSearchMc = `SELECT fid, fmc_name, fline FROM tb_mc`
        if (req.query.machine) {
            qSearchMc += ` WHERE fmc_name LIKE '%${req.query.machine}%'`
        }
        qSearchMc += ` ORDER BY fmc_name ASC`
        cmdQuery(qSearchMc)
            .then((results) => {
                res.status(200).json({
                    message: "Success to Serch mc",
                    data: results
                })
            }).catch((err) => {
                res.status(203).json({
                    message: 'Error Search Machine',
                    err: err
                })
            });
    },
    addProblem: (req, res) => {
        let { ferror_name, foperator, fmc_id } = req.body
        let qCheckProblem = `SELECT fid FROM tb_status WHERE fid = ${fmc_id} AND fstatus = 0`
        let qAddProb = `insert into tb_error_log_2 (foperator, ferror_name, fstart_time, fmc_id) VALUES ( '${foperator}', '${ferror_name}', CURRENT_TIMESTAMP(), ${fmc_id})`
        let qUpdateColDash = `update tb_status set fstatus = 1, ferror_start = CURRENT_TIMESTAMP(), ferror_end = NULL where fid = ${fmc_id}`
        cmdQuery(qCheckProblem)
            .then((result) => {
                if (result.length > 0) {
                    cmdQuery(qAddProb)
                        .then((results) => {
                            cmdQuery(qUpdateColDash)
                                .then(() => {
                                    res.status(201).json({
                                        message: 'Success to POST new Problem',
                                        data: results
                                    })
                                }).catch((err) => {
                                    res.status(203).json({
                                        message: 'Error Request',
                                        err
                                    })
                                });
                        })
                } else {
                    res.status(203).json({
                        message: 'Anda tidak bisa input double problem di mesin yang sama',
                    })
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({
                    message: 'Error duplicate',
                    err: err.message
                })
            });
    },
    getDetailProblem: (req, res) => {
        let qDetailProb = `SELECT  * FROM v_current_error_2 where fid = ${req.query.v_}`
        cmdQuery(qDetailProb)
            .then((results) => {
                res.status(200).json({
                    message: 'Success to get detail problem',
                    data: results
                })
            }).catch((err) => {
                res.status(203).json({
                    message: 'Error Request get detail problem',
                    err
                })
            });
    },
    editProblem: async(req, res) => {
        let containerQuery = []
        let qEditProb = `UPDATE tb_error_log_2 set`
        let idx = 0
        Object.size = function(obj) {
            var size = 0,
                key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++;
            }
            return size;
        };
        let size = Object.size(req.body)
            // console.log(size);
        for (key in req.body) {
            console.log(idx);
            idx++
            if (key == 'fstart_time' || key == 'fend_time') {
                qEditProb += ` ${key}=TIMESTAMP('${req.body[key][0]}', '${req.body[key][1]}')`
            } else if (key == 'fiveWhyLhApprove' || key == 'fiveWhyShApprove' || key == 'cmLhApprove' || key == 'cmShApprove') {
                qEditProb += ` ${key}=${req.body[key] == 0 ? false : true}`
            } else {
                qEditProb += ` ${key}='${req.body[key]}'`
            }
            if (idx == size) {} else {
                qEditProb += ','
            }
        }
        qEditProb += ` where fid = ${req.params.v_}`
            // console.log(qEditProb);
        containerQuery.push(qEditProb)
        if (req.query.isFinished) {
            let qUpdateColDash = `update tb_status set fstatus = 0, ferror_start = NULL, ferror_end = NULL where fid = ${req.query.isFinished}`
            containerQuery.push(qUpdateColDash)
            if (req.query.line) {
                let qCloseNotif = `UPDATE tb_notif SET isSentLh = false, isSentSh = false, isSentAm = false, isSentDiv = false WHERE line LIKE '%${req.query.line}%'`
                containerQuery.push(qCloseNotif)
            }
        }
        if (containerQuery.length <= 1) {
            await dbSingleQuery(qEditProb)
                .then(({ data }) => {
                    res.status(200).json({
                        message: 'Success to edit problem',
                        data
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                        message: 'Error to edit problem',
                        err: err.message
                    })
                });
        } else {
            cmdMultipleQuery(containerQuery.join(";"))
                .then((result) => {
                    res.status(200).json({
                        message: 'Success to edit problem',
                        data: result
                    })
                }).catch((err) => {
                    res.status(500).json({
                        message: 'Error to edit problem',
                        data: err
                    })
                });
        }
    },
    finishProblem: (req, res) => {
        let containerQuery = []
        let qEditProb = `UPDATE tb_error_log_2 set`
        let idx = 0
        Object.size = function(obj) {
            var size = 0,
                key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++;
            }
            return size;
        };
        let size = Object.size(req.body)
            // console.log(size);
        for (key in req.body) {
            console.log(idx);
            idx++
            if (key == 'fstart_time' || key == 'fend_time') {
                qEditProb += ` ${key}=TIMESTAMP('${req.body[key][0]}', '${req.body[key][1]}')`
            } else if (key == 'fiveWhyLhApprove' || key == 'fiveWhyShApprove' || key == 'cmLhApprove' || key == 'cmShApprove') {
                qEditProb += ` ${key}=${req.body[key] == 0 ? false : true}`
            } else {
                qEditProb += ` ${key}='${req.body[key]}'`
            }
            if (idx == size) {} else {
                qEditProb += ','
            }
        }
        qEditProb += ` where fid = ${req.params.v_}`
        containerQuery.push(qEditProb)
        if (req.query.isFinished) {
            let qUpdateColDash = `update tb_status set fstatus = 0, ferror_start = NULL, ferror_end = NULL where fid = ${req.query.isFinished}`
            containerQuery.push(qUpdateColDash)
            if (req.query.line) {
                let qCloseNotif = `UPDATE tb_notif SET isSentLh = false, isSentSh = false, isSentAm = false, isSentDiv = false WHERE line LIKE '%${req.query.line}%'`
                containerQuery.push(qCloseNotif)
            }
        }
        cmdMultipleQuery(`${qEditProb};`)
            .then((result) => {
                res.status(200).json({
                    message: 'Success to edit problem',
                    data: result
                })
            }).catch((err) => {
                res.status(500).json({
                    message: 'Error to edit problem',
                    data: err
                })
            });
    },
    deleteProblem: (req, res) => {
        let qDeleteProb = `DELETE FROM tb_error_log_2 WHERE fid = ${req.params.v_}`;
        cmdQuery(qDeleteProb)
            .then((results) => {
                res.status(200).json({
                    message: 'Success to delete problem',
                    data: results
                })
            }).catch((err) => {
                res.status(203).json({
                    message: 'Error Request',
                    err
                })
            });
    },
    getActiveProblem: (req, res) => {
        let q = `select t1.*, ifnull( timestampdiff(minute , t1.fstart_time , t1.fend_time ) , timestampdiff(minute , t1.fstart_time , now() )) as fdur , t2.fop_desc
                    from v_current_error_2 t1 , tb_mc t2 
                    where t1.fline LIKE '%${req.query.fline}%' and t1.fend_time is null and t2.fmc_name = t1.fmc_name 
                    limit 5`
        cmdQuery(q)
            .then((results) => {
                res.status(200).json({
                    message: 'Success to get active problem',
                    data: results
                })
            }).catch((err) => {
                res.status(203).json({
                    message: 'Error to get active problem',
                    err: err
                })
            });
    },
    poolEnd: (req, res) => {
        res.status(200).json({
            message: 'NOTHING TO DO',
        })
    }
}