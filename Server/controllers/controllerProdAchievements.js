const credentials = require('../config/Credentials');
const dbSingleQuery = require('../config/MysqlConnection')
const mysql = require("mysql");
const cmdMultipleQuery = require('../config/MultipleQueryConnection');
const upload = require('../functions/upload')


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
            var q = `select * from tb_line where parent_id is null`;
            dbSingleQuery(q)
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
            dbSingleQuery(q)
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
            dbSingleQuery(qTodayProb)
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
                        if (req.query[key].includes(' ')) {
                            startDate = req.query[key]
                        } else {
                            startDate = formatDate(req.query[key]);
                        }
                    } else if (key == 'endDate') {

                        if (req.query[key].includes(' ')) {
                            endDate = req.query[key]
                        } else {
                            endDate = formatDate(req.query[key]);
                        }
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
                // let d = new Date(endDate);
                // console.log(d);
                // let offsetTimeEndDate = d.setDate(d.getDate() + 1);
                // console.log(endDate);
                // console.log(offsetTimeEndDate);
                // let offsetEndDate = formatDate(new Date(offsetTimeEndDate));
                // console.log(offsetEndDate);
                qProbHistory += ` WHERE fstart_time BETWEEN '${startDate}' AND '${endDate}'${qProblem}${qMachine} ${qLine} ORDER BY fdur DESC`
                console.log(qProbHistory);
                dbSingleQuery(qProbHistory)
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
            dbSingleQuery(qLogOee)
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
            dbSingleQuery(qtTotalTodayProb)
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
            dbSingleQuery(qProblem)
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
            dbSingleQuery(qProbTemp)
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
            dbSingleQuery(qSearchMc)
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
            let qCheckProblem = `SELECT fid FROM tb_status WHERE fid = ${fmc_id} AND fstatus = '0'`
            let qAddProb = `insert into tb_error_log_2 (foperator, ferror_name, fstart_time, fmc_id) VALUES ( '${foperator}', '${ferror_name}', CURRENT_TIMESTAMP(), ${fmc_id})`
            let qUpdateColDash = `update tb_status set fstatus = '1', ferror_start = CURRENT_TIMESTAMP(), ferror_end = NULL where fid = ${fmc_id}`
            dbSingleQuery(qCheckProblem)
                .then((result) => {
                    console.log(`SELECT fid FROM tb_status WHERE fid = ${fmc_id} AND fstatus = '0'`);
                    console.log(result);
                    if (result.length > 0) {
                        dbSingleQuery(qAddProb)
                            .then((results) => {
                                dbSingleQuery(qUpdateColDash)
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
            dbSingleQuery(qDetailProb)
                .then(async(results) => {
                    let detailProblem = results
                    if (detailProblem.length > 0) {
                        let qGetUraian = `SELECT * FROM tb_r_uraian WHERE error_id = ${detailProblem[0].fid}`
                        let dataUraian = await dbSingleQuery(qGetUraian)
                        results[0].uraian = dataUraian
                        res.status(200).json({
                            message: 'Success to get detail problem',
                            data: results
                        })
                    }
                }).catch((err) => {
                    console.log(err);
                    res.status(203).json({
                        message: 'Error Request get detail problem',
                        err
                    })
                });
        },
        editProblem: async(req, res) => {
                console.log('REQ FILES');
                console.log(req.files);
                let pathFimgProblem = req.files.fimage_problem ? `${req.files.fimage_problem[0].destination}${req.files.fimage_problem[0].filename}` : null
                let pathStdImg = req.files.std_img ? `${req.files.std_img[0].destination}${req.files.std_img[0].filename}` : null
                let pathActImg = req.files.act_img ? `${req.files.act_img[0].destination}${req.files.act_img[0].filename}` : null
                let pathWhyImg = req.files.why1_img ? `${req.files.why1_img[0].destination}${req.files.why1_img[0].filename}` : null
                    // console.log(req.files.fimage_problem.destination);
                req.body.why1_img = pathWhyImg
                let containerQuery = []
                let qEditProb = `UPDATE tb_error_log_2 set`
                let idx = 0
                console.log('HERE REQ> BODY BROOO');
                console.log(req.body);
                let size = 0

                // furaian_kejadian_general
                let uraian = []
                for (const key in req.body) {
                    const vals = req.body[key];
                    if (key == 'furaian_kejadian_general') uraian.push({ desc_name: req.body['furaian_kejadian_general'], type_uraian: 'general' })
                    if (key == 'furaian_kejadian_standard') uraian.push({ desc_name: req.body['furaian_kejadian_standard'], type_uraian: 'standard' })
                    if (key == 'furaian_kejadian_actual') uraian.push({ desc_name: req.body['furaian_kejadian_actual'], type_uraian: 'actual' })
                }
                console.log(uraian);
                if (uraian.length > 0) {
                    let qUraianInsert = []
                    let qUraianUpdate = []
                    for (let i = 0; i < uraian.length; i++) {
                        const element = uraian[i];
                        await cmdMultipleQuery(`SELECT id from tb_r_uraian where error_id = ${req.params.v_} AND type_uraian='${element.type_uraian}'`)
                            .then((result) => {
                                console.log(result)
                                let ilusUraian = null
                                if (pathFimgProblem && i == 0) {
                                    ilusUraian = pathFimgProblem
                                    if (result.length > 0) {
                                        qUraianUpdate.push(`UPDATE tb_r_uraian SET desc_nm = '${element.desc_name}', ilustration = ${ilusUraian ? `'${ilusUraian}'` : ilusUraian} where error_id = ${req.params.v_} AND type_uraian='${element.type_uraian}'`)
                            
                                    } else {
                                        qUraianInsert.push(`INSERT INTO tb_r_uraian(error_id, desc_nm, ilustration, type_uraian) VALUES (${req.params.v_}, '${element.desc_name}', ${ilusUraian ? `'${ilusUraian}'` : ilusUraian}, '${element.type_uraian}')`)
                                        
                                    }
                                }
                                if (pathStdImg && i == 1) {
                                    ilusUraian = pathStdImg
                                    if (result.length > 0) {
                                        qUraianUpdate.push(`UPDATE tb_r_uraian SET desc_nm = '${element.desc_name}', ilustration = ${ilusUraian ? `'${ilusUraian}'` : ilusUraian} where error_id = ${req.params.v_} AND type_uraian='${element.type_uraian}'`)
                            
                                    } else {
                                        qUraianInsert.push(`INSERT INTO tb_r_uraian(error_id, desc_nm, ilustration, type_uraian) VALUES (${req.params.v_}, '${element.desc_name}', ${ilusUraian ? `'${ilusUraian}'` : ilusUraian}, '${element.type_uraian}')`)
                                        
                                    }
                                }
                                if (pathActImg && i ==2) {
                                    ilusUraian = pathActImg
                                    if (result.length > 0) {
                                        qUraianUpdate.push(`UPDATE tb_r_uraian SET desc_nm = '${element.desc_name}', ilustration = ${ilusUraian ? `'${ilusUraian}'` : ilusUraian} where error_id = ${req.params.v_} AND type_uraian='${element.type_uraian}'`)
                            
                                    } else {
                                        qUraianInsert.push(`INSERT INTO tb_r_uraian(error_id, desc_nm, ilustration, type_uraian) VALUES (${req.params.v_}, '${element.desc_name}', ${ilusUraian ? `'${ilusUraian}'` : ilusUraian}, '${element.type_uraian}')`)
                                        
                                    }
                                }
                                if (result.length > 0) {
                                    qUraianUpdate.push(`UPDATE tb_r_uraian SET desc_nm = '${element.desc_name}' where error_id = ${req.params.v_} AND type_uraian='${element.type_uraian}'`)
                        
                                } else {
                                    qUraianInsert.push(`INSERT INTO tb_r_uraian(error_id, desc_nm, type_uraian) VALUES (${req.params.v_}, '${element.desc_name}', '${element.type_uraian}')`)
                                    
                                }


                                // if (result.length > 0) {
                                //     qUraianUpdate.push(`UPDATE tb_r_uraian SET desc_nm = '${element.desc_name}', ilustration = ${ilusUraian ? `'${ilusUraian}'` : ilusUraian} where error_id = ${req.params.v_} AND type_uraian='${element.type_uraian}'`)
                        
                                // } else {
                                //     qUraianInsert.push(`INSERT INTO tb_r_uraian(error_id, desc_nm, ilustration, type_uraian) VALUES (${req.params.v_}, '${element.desc_name}', ${ilusUraian ? `'${ilusUraian}'` : ilusUraian}, '${element.type_uraian}')`)
                                    
                                // }
                    }).catch((err) => {
                        console.log(err)
                    });
            }
            if(qUraianInsert.length > 0) {
                cmdMultipleQuery(qUraianInsert.join(';'))
            }
            if(qUraianUpdate.length > 0) {
                console.log(qUraianUpdate);
                cmdMultipleQuery(qUraianUpdate.join(';'))
            }
        }

        delete req.body.fimage_problem;
        delete req.body.std_img;
        delete req.body.act_img;
        delete req.body.furaian_kejadian_general;
        delete req.body.furaian_kejadian_standard;
        delete req.body.furaian_kejadian_actual;

        for (const key in req.body) {
            // console.log(key);
            size++;
        }

        for (key in req.body) {
            idx++
            if (key == 'fstart_time' || key == 'fend_time') {
                qEditProb += ` ${key}=TIMESTAMP('${req.body[key]}')`
            } else if (key == 'fiveWhyLhApprove' || key == 'fiveWhyShApprove' || key == 'cmLhApprove' || key == 'cmShApprove') {
                qEditProb += ` ${key}=${req.body[key] == 0 ? false : true}`
            }else if(key == 'why1_img' && req.body[key]){
                qEditProb += ` ${key}='${req.body[key]}'`
            }else if(key == 'why1_img' && !req.body[key]){
                continue
            }else{
                qEditProb += ` ${key}='${req.body[key]}'`
            }
            if (idx == size) {} else {
                qEditProb += ','
            }
        }
        qEditProb += ` where fid = ${req.params.v_}`
            console.log(qEditProb);
        containerQuery.push(qEditProb)
        if (req.query.isFinished) {
            var qUpdateColDash = `update tb_status set fstatus = 0, ferror_start = NULL, ferror_end = NULL where fid = ${req.query.isFinished}`
            containerQuery.push(qUpdateColDash)
            if (req.query.line) {
                var qCloseNotif = `UPDATE tb_notif SET isSentLh = false, isSentSh = false, isSentAm = false, isSentDiv = false WHERE line LIKE '%${req.query.line}%'`
                containerQuery.push(qCloseNotif)
            }
            let qUpdateEndJob = `UPDATE tb_jobdesk SET 
                fend_time = TIMESTAMP('${req.body['fend_time']}'), 
                fstart_time = TIMESTAMP('${req.body['fstart_time']}'),
                fcommentLh = '${req.body.cmLhFeedback}',
                fcommentSh = '${req.body.cmShFeedback}',
                fcommentDph = '${req.body.cmDhFeedback}'
                    WHERE fproblem_id = ${req.params.v_}`
            console.log(qUpdateEndJob);
            await cmdMultipleQuery(qUpdateEndJob)
                .then(resIns => {
                    console.log(resIns);
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            console.log('INI adalah Problem yang belum close');
            console.log(req.body);
            let arrMt = typeof req.body.foperator == 'string' ? [req.body.foperator] : req.body.foperator
            let arrQueryCek = []
            let qResMt = ''
            arrMt.forEach(member => {
                let qCekMtJob = `SELECT foperator FROM tb_jobdesk WHERE fproblem_id = ${req.params.v_} AND foperator = '${member}'`
                arrQueryCek.push(qCekMtJob)
            })
            console.log(arrQueryCek);
            qResMt = arrQueryCek.length > 1 ? arrQueryCek.join(';') : arrQueryCek[0]
            await cmdMultipleQuery(qResMt)
                .then(async res => {
                    console.log(res);
                    let mapMt = await res.map((itemJob, i) => {
                        let element = itemJob.foperator ? itemJob : itemJob[0]
                        if (element) {
                            // nothing
                        } else {
                            return arrMt[i]
                        }
                        console.log(element);
                    })
                    console.log(mapMt);
                    let containerQInstJob = []
                    await mapMt.forEach(itmMtAfterMap => {
                        if (itmMtAfterMap) {
                            let qInstJob = `INSERT INTO tb_jobdesk (
                                fline, 
                                farea, 
                                fproblem_id, 
                                fjob_type, 
                                fdesc, 
                                fstart_time, 
                                foperator, 
                                fgroup,
                                fcommentLh,
                                fcommentSh,
                                fcommentDph)
                                VALUES 
                                ('${req.query.fline}',
                                '${req.query.fmc_name}',
                                ${req.params.v_},
                                'Repair', 
                                '${req.body.ferror_name}',
                                TIMESTAMP('${req.body['fstart_time']}'),
                                '${itmMtAfterMap}',
                                'Repair',
                                '${req.body.cmLhFeedback}',
                                '${req.body.cmShFeedback}',
                                '${req.body.cmDhFeedback}')`
                            containerQInstJob.push(qInstJob)
                        }
                    })
                    await cmdMultipleQuery(containerQInstJob.join(';'))
                        .then(resIns => {
                            console.log(resIns);
                        })
                        .catch(err => {
                            console.log(err);
                        })
                })
                .catch(err => {
                    console.log(err);
                })
        }
        console.log(qEditProb);
        if (containerQuery.length <= 1) {
            await cmdMultipleQuery(qEditProb)
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
            await cmdMultipleQuery(qUpdateColDash).then(({ data }) => { console.log(data) }).catch(err => { console.log(err) })
            await cmdMultipleQuery(qEditProb).then(({ data }) => { console.log(data) }).catch(err => { console.log(err) })
            await cmdMultipleQuery(qCloseNotif).then(async({ data }) => {
                let qUpdJob = `UPDATE tb_jobdesk SET fstart_time = TIMESTAMP('${req.body['fstart_time']}'), fend_time = TIMESTAMP('${req.body['fend_time']}') WHERE fproblem_id = ${req.params.v_}`
                await cmdMultipleQuery(qUpdJob)
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(err);
                    })
                res.status(200).json({
                    message: 'Success to edit problem',
                    data
                })
            }).catch(err => {
                res.status(500).json({
                    message: 'Error to edit problem',
                    err: err.message
                })
            })
        }
    },
    finishProblem: (req, res) => {
        let containerQuery = []
        let qEditProb = `UPDATE tb_error_log_2 set`
        let idx = 0
        console.log('HERE REQ> BODY BROOO');
        console.log(req.body);
        if (req.file) {
            // upload()
            console.log();
            console.log(req);
        }
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
    deleteProblem: async (req, res) => {
        let qDeleteUraian = `DELETE FROM tb_r_uraian WHERE error_id = ${req.params.v_}`
        let qDeleteProb = `DELETE FROM tb_error_log_2 WHERE fid = ${req.params.v_}`;
        let isDeleted = await dbSingleQuery(qDeleteUraian)
            .then((results) => {
                return true
            }).catch((err) => {
                res.status(203).json({
                    message: 'Error Request',
                    err
                })
            });
        if(isDeleted == true) {
            await dbSingleQuery(qDeleteProb)
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
        }
        
    },
    getActiveProblem: (req, res) => {
        let q = `select t1.*, ifnull( timestampdiff(minute , t1.fstart_time , t1.fend_time ) , timestampdiff(minute , t1.fstart_time , now() )) as fdur , t2.fop_desc
                    from v_current_error_2 t1 , tb_mc t2 
                    where t1.fline LIKE '%${req.query.fline}%' and t1.fend_time is null and t2.fmc_name = t1.fmc_name 
                    limit 5`
        dbSingleQuery(q)
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
    },
    getAllActiveProblem: (req, res) => {
        let q = `select t1.*, ifnull( timestampdiff(minute , t1.fstart_time , t1.fend_time ) , timestampdiff(minute , t1.fstart_time , now() )) as fdur , t2.fop_desc
        from v_current_error_2 t1 , tb_mc t2 
        where t1.fend_time is null and t2.fmc_name = t1.fmc_name 
        limit 5`
        cmdMultipleQuery(q)
            .then(result => {
                res.status(200).json({
                    message: 'OK',
                    data: result
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: 'ERR',
                    err
                })
            })
    }
}