const cmdMultipleQuery = require('../config/MultipleQueryConnection');

function gettingError(res, err) {
    res.status(203).json({
        message: 'Error',
        err
    })
}

module.exports = {
    getProblemTemporary: (req, res) => {
        let arrLines = ['LPDC', 'HPDC', 'CAM SHAFT', 'CRANK SHAFT', 'CYLINDER HEAD', 'CYLINDER BLOCK', 'ASSY LINE']
        let containerQuery = ``
        for (let i = 0; i < arrLines.length; i++) {
            const line = arrLines[i];
            containerQuery += `SELECT  * FROM v_current_error_2 
                WHERE MONTH(fstart_time) = MONTH(now()) 
                    AND YEAR(fstart_time) = YEAR(now()) 
                    AND fdur >= 30 AND fline LIKE '%${line}%' AND fpermanet_cm = '' AND fshift = 'r';
                SELECT  * FROM v_current_error_2  
                WHERE MONTH(fstart_time) = MONTH(now()) 
                    AND YEAR(fstart_time) = YEAR(now()) 
                    AND fdur >= 30 AND fline LIKE '%${line}%' AND fpermanet_cm = '' AND fshift = 'w'`

            if (i < arrLines.length - 1) {
                containerQuery += ';'
            }
        }
        cmdMultipleQuery(containerQuery)
            .then((results) => {
                console.log(results)
                res.status(200).json({
                    message: 'Success to get Problem Temporary',
                    data: results
                })
            }).catch((err) => {
                console.error(err)
                gettingError(res, err)
            });
        console.log(containerQuery);
    },
    getProblemFreq: (req, res) => {
        let fline = ""
        fmc_name = ""
        startDate = ""
        endDate = ""
        if (req.query.startDate) {
            startDate = `${req.query.startDate}`
        }
        if (req.query.endDate) {
            endDate = `${req.query.endDate}`
        }

        if (req.query.fline) {
            fline = ` AND fline LIKE '%${req.query.fline}%'`
        }
        if (req.query.fmc) {
            fmc_name = ` AND fmc_name LIKE '%${req.query.fmc}%'`
        }

        let qFreq = `SELECT * FROM v_current_error_2 
        WHERE
            (fdur >= 30 AND fdur < 120 AND
                date(fstart_time) >= date('${startDate}') AND 
                date(fstart_time) <= date('${endDate}')${fline}${fmc_name} AND 
                fline NOT LIKE '%ASSY%') OR
            (fdur >= 10 AND fdur < 15 AND
                date(fstart_time) >= date('${startDate}') AND 
                date(fstart_time) <= date('${endDate}')${fline}${fmc_name} AND
                fline LIKE '%ASSY%')`
        cmdMultipleQuery(qFreq)
            .then((result) => {
                res.status(200).json({
                    message: 'Success to get Freq Problem',
                    data: result
                })
            }).catch((err) => {
                gettingError(res, err)
            });
    },
    getProblemLtb: (req, res) => {
        let fline = ""
        fmc_name = ""
        startDate = ""
        endDate = ""
        if (req.query.startDate) {
            startDate = `${req.query.startDate}`
        }
        if (req.query.endDate) {
            endDate = `${req.query.endDate}`
        }

        if (req.query.fline) {
            fline = ` AND fline LIKE '%${req.query.fline}%'`
        }
        if (req.query.fmc) {
            fmc_name = ` AND fmc_name LIKE '%${req.query.fmc}%'`
        }
        let qFreq = `SELECT * FROM v_current_error_2 
        WHERE
            (fdur >= 120 AND
                date(fstart_time) >= date('${startDate}') AND 
                date(fstart_time) <= date('${endDate}')${fline}${fmc_name} AND
                fline NOT LIKE '%ASSY%') OR
            (fdur >= 15 AND
                date(fstart_time) >= date('${startDate}') AND 
                date(fstart_time) <= date('${endDate}')${fline}${fmc_name} AND
                fline LIKE '%ASSY%') OR
            (problemCategory = 3 AND
                date(fstart_time) >= date('${startDate}') AND 
                date(fstart_time) <= date('${endDate}')${fline}${fmc_name})`
        cmdMultipleQuery(qFreq)
            .then((result) => {
                res.status(200).json({
                    message: 'Success to get LTB Problem',
                    data: result
                })
            }).catch((err) => {
                gettingError(res, err)
            });
    },
    // Problem Chokotei
    getProblemChokotei: (req, res) => {
        let fline = "";
        let fmc_name = "";
        let startDate = "";
        let endDate = "";
        if (req.query.startDate) {
            startDate = `${req.query.startDate}`;
        }
        if (req.query.endDate) {
            endDate = `${req.query.endDate}`;
        }

        if (req.query.fline) {
            fline = ` AND fline LIKE '%${req.query.fline}%'`;
        }
        if (req.query.fmc) {
            fmc_name = ` AND fmc_name LIKE '%${req.query.fmc}%'`;
        }
        let qFreq = `SELECT * FROM v_current_error_2 
        WHERE
            (problemCategory = 2 AND
                date(fstart_time) >= date('${startDate}') AND 
                date(fstart_time) <= date('${endDate}')${fline}${fmc_name})`
        cmdMultipleQuery(qFreq)
            .then((result) => {
                res.status(200).json({
                    message: "Success to get Chokotei Problem",
                    data: result,
                });
            })
            .catch((err) => {
                gettingError(res, err);
            });
    },

    getProblemSmall: (req, res) => {
        let fline = "";
        let fmc_name = "";
        let startDate = "";
        let endDate = "";
        if (req.query.startDate) {
            startDate = `${req.query.startDate}`;
        }
        if (req.query.endDate) {
            endDate = `${req.query.endDate}`;
        }

        if (req.query.fline) {
            fline = ` AND fline LIKE '%${req.query.fline}%'`;
        }
        if (req.query.fmc) {
            fmc_name = ` AND fmc_name LIKE '%${req.query.fmc}%'`;
        }
        let qFreq = `SELECT * FROM v_current_error_2 
        WHERE
            (problemCategory = 1 AND
                date(fstart_time) >= date('${startDate}') AND 
                date(fstart_time) <= date('${endDate}')${fline}${fmc_name})`
        cmdMultipleQuery(qFreq)
            .then((result) => {
                res.status(200).json({
                    message: "Success to get Chokotei Problem",
                    data: result,
                });
            })
            .catch((err) => {
                gettingError(res, err);
            });
    },
    getSummaryWeekly: (req, res) => {
        let containerQuery = []
        let ltbCondCM = `((fline = 'Cylinder Head' OR fline = 'Cylinder Block' OR fline = 'Crank shaft' OR fline = 'Cam Shaft') AND fdur >= 120)`
        let ltbCondK = `fline = 'ASSY LINE' AND fdur >= 15`
        let qHerman = `SELECT fstart_time, fline, ferror_name, fdur, foperator FROM 
            v_current_error_2 WHERE
            fshift = 'w' AND
            (fline = 'ASSY LINE' OR fline = 'Cylinder Head' OR fline = 'Cylinder Block' OR fline = 'Crank shaft' OR fline = 'Cam Shaft') AND
            fpermanet_cm = '[]' AND
            fdur >= 30`
        let qHermanFin = `SELECT count(fid) AS totalFinish FROM 
            v_current_error_2 WHERE
            fshift = 'w' AND
            (fline = 'ASSY LINE' OR fline = 'Cylinder Head' OR fline = 'Cylinder Block' OR fline = 'Crank shaft' OR fline = 'Cam Shaft') AND
            fpermanet_cm LIKE '%[{%' AND
            fdur >= 30`
        let qHartanto = `SELECT fstart_time, fline, ferror_name, fdur, foperator FROM 
            v_current_error_2 WHERE
            fshift = 'w' AND
            (fline = 'LPDC' OR fline = 'HPDC') AND
            fpermanet_cm = '[]' AND
            fdur >= 30`
        let qHartantoFin = `SELECT count(fid) AS totalFinish FROM
            v_current_error_2 WHERE
            fshift = 'w' AND
            (fline = 'LPDC' OR fline = 'HPDC') AND
            fpermanet_cm LIKE '%[{%' AND
            fdur >= 30`
        let qWahyu = `SELECT fstart_time, fline, ferror_name, fdur, foperator FROM 
            v_current_error_2 WHERE
            fshift = 'r' AND
            (fline = 'ASSY LINE' OR fline = 'Cylinder Head' OR fline = 'Cylinder Block' OR fline = 'Crank shaft' OR fline = 'Cam Shaft') AND
            fpermanet_cm = '[]' AND
            fdur >= 30`
        let qWahyuFin = `SELECT count(fid) AS totalFinish FROM
            v_current_error_2 WHERE
            fshift = 'r' AND
            (fline = 'ASSY LINE' OR fline = 'Cylinder Head' OR fline = 'Cylinder Block' OR fline = 'Crank shaft' OR fline = 'Cam Shaft') AND
            fpermanet_cm LIKE '%[{%' AND
            fdur >= 30`
        let qTri = `SELECT fstart_time, fline, ferror_name, fdur, foperator FROM 
            v_current_error_2 WHERE
            fshift = 'r' AND
            (fline = 'LPDC' OR fline = 'HPDC') AND
            fpermanet_cm = '[]' AND
            fdur >= 30`
        let qTriFin = `SELECT count(fid) AS totalFinish FROM
            v_current_error_2 WHERE
            fshift = 'r' AND
            (fline = 'LPDC' OR fline = 'HPDC') AND
            fpermanet_cm LIKE '%[{%' AND
            fdur >= 30`
            // (fdur >= 30 AND MONTH(fstart_time) <= MONTH(NOW())))
            // (fdur >= 120 AND(MONTH(fstart_time) - MONTH(NOW())) <= 3))
        let qGetAll = `SELECT * FROM v_current_error_2 WHERE
            fshift <> '-' AND
            fshift <> '' AND
            (
                fdur >= 120 AND (
                    fline = 'Cylinder Head' OR fline = 'Cylinder Block' OR fline = 'Crank shaft' OR fline = 'Cam Shaft' OR fline = 'HPDC' OR fline = 'LPDC'
                )
            ) OR (
                fdur >= 15 AND (
                    fline = 'ASSY LINE'
                )
            ) AND
            
            MONTH(fstart_time) >= MONTH(NOW())-3 AND
            fav_categoty <> 'DIES' AND
            cmLhFeedback IS NOT NULL`;
        let qGetAllLtb = `SELECT * FROM v_current_error_2 WHERE
            fshift <> '-' AND
            fshift <> '' AND
            ${ltbCondCM} AND
            ${ltbCondK} AND
            fav_categoty <> 'DIES' AND
            cmLhFeedback IS NOT NULL`;
        containerQuery.push(qHerman, qHartanto, qWahyu, qTri, qHermanFin, qHartantoFin, qWahyuFin, qTriFin, qGetAll, qGetAllLtb)
        cmdMultipleQuery(containerQuery.join(';'))
            .then((result) => {
                res.status(200).json({
                    message: 'Success to get problem not yet completed',
                    data: result,
                    count: [result[0].length, result[1].length, result[2].length, result[3].length],
                    countFin: [result[4][0].totalFinish, result[5][0].totalFinish, result[6][0].totalFinish, result[7][0].totalFinish]
                })
                console.log(result)
            }).catch((err) => {
                console.log(err);
            });
    },
    getProblemByCategory: (req, res) => {
        let q = `SELECT * FROM v_current_error_2`
        if (req.body.filterQuery) {
            q += ` WHERE ${req.body.filterQuery}`
        }
        cmdMultipleQuery(q)
            .then((result) => {
                res.status(200).json({
                    message: 'Success to get LTB Problem',
                    data: result
                })
            }).catch((err) => {
                gettingError(res, err)
            });
    }
}