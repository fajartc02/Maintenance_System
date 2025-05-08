const cmdMultipleQuery = require('../../config/MultipleQueryConnection');

function gettingSuccess(res, data) {
    return res.status(200).json({
        message: 'OK',
        data
    })
}

function gettingError(res, err, code = 500) {
    return res.status(code).json({
        message: 'Err',
        err
    })
}


module.exports = {
        getParetoData: (req, res) => {
                let { isMachine = null, isOrderFreq = null, fstart_date, fend_date, fline, fmc_name = null, fav_categoty = null, isNoLimit = null } = req.query
                let queryParetoMc = `SELECT
            ${fmc_name ? `fid,` : 'fid,'}
            ${isMachine ? 'fmc_name,' : 'ferror_name,'}
            ${isOrderFreq ? 'count(fid) AS fdur,' : 'sum(fdur) AS fdur,'}
            fline,
            id_m_problem_member
            ${isMachine ? '' : ',fname_theme_member'}
        FROM
            v_current_error_2
        WHERE
            fstart_time BETWEEN '${fstart_date}' AND '${fend_date}'
            ${fmc_name ? ` AND fmc_name LIKE '%${fmc_name}%'` : ''}
            ${fav_categoty ? ` AND fav_categoty = '${fav_categoty}'` : ''}
            AND fdur > 3 AND fline LIKE '%${fline}%' AND fend_time IS NOT NULL
        GROUP BY
            ${isMachine ? 'fmc_name' : 'ferror_name'}
        ORDER BY
            ${isOrderFreq ? 'fdur' : 'fdur'} desc
        ${isNoLimit ? '' : 'LIMIT 15'}`
        cmdMultipleQuery(queryParetoMc)
            .then((result) => {
                gettingSuccess(res, result)
            }).catch((err) => {
                gettingError(res, err)
            });
    },
    getDetailPareto: (req, res) => {
        let queryGetDataDetail = `SELECT * FROM v_current_error_2 
            WHERE fstart_time BETWEEN '2022-03-01' AND '2022-03-31' AND 
            fdur > 3 AND ferror_name = 'Cycle time over' AND 
            fline LIKE '%crank shaft%' 
        ORDER BY fdur DESC`

    },
    addFocusTheme: (req, res) => {
        // let { id_m_member, id_m_problem, date_plan } = req.body
        let containerKeyCol = []
        let containerVals = []
        for (const key in req.body) {
            containerKeyCol.push(key)
            containerVals.push(`'${req.body[key]}'`)
        }
        let queryAddTheme = `INSERT INTO m_problem_member
            (
                ${containerKeyCol.join(',')}
            ) 
                VALUES
            (
                ${containerVals.join(',')}
            )`
        cmdMultipleQuery(`${queryAddTheme}`)
            .then((result) => {
                console.log(result.insertId)
                res.status(201).json({
                    message: 'Success to add',
                    data: result
                })
            }).catch((err) => {
                console.error(err);
                res.status(500).json({
                    message: 'Error to add',
                    err: err.message
                })
            });
    },
    updateFocusTheme: (req, res) => {
        let id_thema = req.params.id_thema
        let containerEdit = []
        for (const key in req.body) {
            // containerKeyCol.push(key)
            containerEdit.push(`${key} = '${req.body[key]}'`)
        }
        let q = `UPDATE 
        m_problem_member 
            SET ${containerEdit.join(',')}
        WHERE fid = ${id_thema}`
        console.log(q);
        cmdMultipleQuery(q)
            .then((result) => {
                res.status(201).json({
                    message: 'ok edit',
                    data: result
                })
            }).catch((err) => {
                gettingError(res, err)
            });
    },
    finishedTheme: (req, res) => {
        let queryUpdateStatus = `UPDATE m_problem_member SET is_status = 1 where fid = ${req.params.vid}`
        cmdMultipleQuery(queryUpdateStatus)
            .then((result) => {
                gettingSuccess(res, result)
            }).catch((err) => {
                gettingError(res, err)
            });
    },
    getMemberSelectedTheme: (req, res) => {
        let { start_time = null, end_time = null } = req.query
        let qRed = `SELECT
	tmm.fid as id_member, 
	tmm.fname as fname,
    tmm.fshift as fshift,
    tmm.fline as line_member,
    vce.fid as id_problem, 
    vce.fstart_time as fstart_time, 
    vce.ferror_name as problem_theme, 
    mpm.is_status as status_theme
FROM 
	tb_mt_member tmm
LEFT JOIN  m_problem_member mpm 
	ON tmm.fid = mpm.id_m_member
LEFT JOIN v_current_error_2 vce
	ON mpm.id_m_problem = vce.fid
WHERE 
    tmm.fline IS NOT NULL AND 
    tmm.fline <> '' AND 
    (frole = 'TM' OR frole = 'GH' OR frole = 'GH.' OR frole = 'TM.') AND 
    (fstart_time BETWEEN '${start_time}' AND '${end_time}') AND
    tmm.fshift = 'RED'
GROUP BY 
    id_problem,fname
ORDER BY fstart_time DESC`
        let qWhite = `SELECT
	tmm.fid as id_member, 
	tmm.fname as fname,
    tmm.fshift as fshift,
    tmm.fline as line_member,
    vce.fid as id_problem, 
    vce.fstart_time as fstart_time, 
    vce.ferror_name as problem_theme, 
    mpm.is_status as status_theme
FROM 
	tb_mt_member tmm
LEFT JOIN  m_problem_member mpm 
	ON tmm.fid = mpm.id_m_member
LEFT JOIN v_current_error_2 vce
	ON mpm.id_m_problem = vce.fid
WHERE 
    tmm.fline IS NOT NULL AND 
    tmm.fline <> '' AND 
    (frole = 'TM' OR frole = 'GH' OR frole = 'GH.' OR frole = 'TM.') AND 
    (fstart_time BETWEEN '${start_time}' AND '${end_time}') AND
    tmm.fshift = 'WHITE'
GROUP BY 
    id_problem,fname
ORDER BY fstart_time DESC`
        cmdMultipleQuery(`${qRed};${qWhite}`)
            .then((result) => {
                let countFinishedMpRed = 0
                let countFinishedMpWhite = 0
                let countNotYetMpRed = 0
                let countNotYetMpWhite = 0
                let detailMemberRed = []
                let detailMemberNotYetRed = []
                let detailMemberWhite = []
                let detailMemberNotYetWhite = []
                result[0].forEach(item => {
                    if (item.id_problem) {
                        countFinishedMpRed += 1
                        detailMemberRed.push(item)
                    } else {
                        countNotYetMpRed += 1
                        detailMemberNotYetRed.push(item)
                    }
                })
                result[1].forEach(item => {
                    if (item.id_problem) {
                        countFinishedMpWhite += 1
                        detailMemberWhite.push(item)
                    } else {
                        countNotYetMpWhite += 1
                        detailMemberNotYetWhite.push(item)
                    }
                })
                res.status(200).json({
                    message: 'ok',
                    pieChartDataSeries: [
                        [countFinishedMpRed, countNotYetMpRed],
                        [countFinishedMpWhite, countNotYetMpWhite],
                    ],
                    detailMp: [
                        [detailMemberRed, detailMemberNotYetRed],
                        [detailMemberWhite, detailMemberNotYetWhite]
                    ]
                })
                console.log(countFinishedMpRed);
                console.log(countFinishedMpWhite);
                console.log(detailMemberRed);
                console.log(detailMemberWhite);
            }).catch((err) => {
                console.log(err);
            });
    },
    getStatusTheme: (req, res) => {
        let containerLines = ['LPDC', 'HPDC', 'CRANK', 'CAM', 'HEAD', 'BLOCK', 'ASSY']
        let containerQueryLines = []
        let containerQueryLinesNot = []
        containerLines.forEach(line => {
            let q = `SELECT
        tmm.fid as id_member, 
        tmm.fname as fname,
        tmm.fshift as fshift,
        vce.fline as fline_error,
        vce.fid as id_problem, 
        vce.fstart_time as fstart_time, 
        vce.ferror_name as problem_theme, 
        mpm.is_status as status_theme 
    FROM 
        tb_mt_member tmm
    LEFT JOIN  m_problem_member mpm 
        ON tmm.fid = mpm.id_m_member
    LEFT JOIN v_current_error_2 vce
        ON mpm.id_m_problem = vce.fid
    WHERE 
        tmm.fline IS NOT NULL AND 
        tmm.fline <> '' AND 
        (frole = 'TM' OR frole = 'GH' OR frole = 'GH.' OR frole = 'TM.') AND 
        (fstart_time BETWEEN '2022-04-01' AND '2022-04-30' OR fstart_time is nUll) AND
        vce.fline LIKE '%${line}%' AND mpm.is_status = 1
    GROUP BY id_problem,fname
    ORDER BY fstart_time DESC`
            let qNot = `SELECT
        tmm.fid as id_member, 
        tmm.fname as fname,
        tmm.fshift as fshift,
        vce.fline as fline_error,
        vce.fid as id_problem, 
        vce.fstart_time as fstart_time, 
        vce.ferror_name as problem_theme, 
        mpm.is_status as status_theme 
    FROM 
        tb_mt_member tmm
    LEFT JOIN  m_problem_member mpm 
        ON tmm.fid = mpm.id_m_member
    LEFT JOIN v_current_error_2 vce
        ON mpm.id_m_problem = vce.fid
    WHERE 
        tmm.fline IS NOT NULL AND 
        tmm.fline <> '' AND 
        (frole = 'TM' OR frole = 'GH' OR frole = 'GH.' OR frole = 'TM.') AND 
        (fstart_time BETWEEN '2022-04-01' AND '2022-04-30' OR fstart_time is nUll) AND
        vce.fline LIKE '%${line}%' AND mpm.is_status = 0
    GROUP BY id_problem,fname
    ORDER BY fstart_time DESC`
            containerQueryLines.push(q)
            containerQueryLinesNot.push(qNot)
        })
        cmdMultipleQuery(`${containerQueryLines.join(';')};${containerQueryLinesNot.join(';')}`)
            .then((result) => {
                res.status(200).json({
                    message: 'ok',
                    dataOk: result.slice(0, 7),
                    dataNg: result.slice(7, result.length)
                })
            }).catch((err) => {
                res.status(500).json({
                    message: 'err',
                    err
                })
            });
    },
    getDetailFT: (req, res) => {
        let q = `SELECT * FROM o_problem_member_detail WHERE id_p_m = ${req.params.id_p_m}`
    },
checkFocusTheme: (req, res) => {
        try {
            let q = `select * from v_ft_member where id_m_problem = ${req.params.problem_id}`
            cmdMultipleQuery(q)
                .then((result) => {
                    console.log(result);
                    if (result.length > 0) {
                        gettingSuccess(res, result)
                    } else {
                        res.status(404).json({
                            message: 'Not Found',
                            data: []
                        });
                    }
                })
        } catch (error) {
            gettingError(res, error)
        }
    },
    countMemberStatus: (req, res) => {
        let qMemberAlready = `SELECT COUNT(fid) as count_member_ft from v_ft_member WHERE created_at BETWEEN '${req.query.start_time}' AND '${req.query.end_time}'`
        let qMtMember = `SELECT COUNT(fid) as count_member_mt  FROM tb_mt_member where farea IS NOT NULL AND (frole = 'TM' OR frole = 'TM.')`
        console.log(qMemberAlready);
        cmdMultipleQuery(qMemberAlready + ';' + qMtMember)
            .then((result) => {
                console.log(result)
                console.log(result[0][0]);
                console.log(result[0]);
                let memberNotYetFT = result[1][0].count_member_mt - result[0][0].count_member_ft
                let resObj = {
                    count_member_finished: result[0][0].count_member_ft,
                    count_member_notyet: memberNotYetFT
                }
                gettingSuccess(res, resObj)

            }).catch((err) => {
                gettingError(res, err)
            });
    },
    getFocusTheme: (req, res) => {
        let q = `SELECT * FROM v_ft_member WHERE created_at BETWEEN '${req.query.start_time}' AND '${req.query.end_time}'`
        if (req.params.id_member) q += ` AND id_m_member = ${req.params.id_member}`
        cmdMultipleQuery(q)
            .then((result) => {
                gettingSuccess(res, result)
            }).catch((err) => {
                gettingError(res, err)
            });
    },
    getMemberFTNotYet: (req, res) => {
        let qMembers = `SELECT * FROM tb_mt_member where farea IS NOT NULL AND (frole = 'TM' OR frole = 'TM.')`
        let qAlreadyFTMembers = `SELECT id_m_member FROM v_ft_member WHERE created_at BETWEEN '${req.query.start_time}' AND '${req.query.end_time}'`
        cmdMultipleQuery(`${qMembers};${qAlreadyFTMembers}`)
            .then((result) => {
                let ex_id_members = result[1].map(item => { return item.id_m_member })
                let filterData = result[0].filter(item => { return ex_id_members.indexOf(item.fid) === -1 })
                gettingSuccess(res, filterData)
            }).catch((err) => {
                gettingError(res, err)
            });
    },
    countTaskForce: (req, res) => {
        let qCountTaskforce = `SELECT COUNT(fid) as count_taskforce from v_current_error_2 WHERE fstart_time BETWEEN '${req.query.start_time}' AND '${req.query.end_time}' AND ferror_name LIKE '%[TASKFORCE]%'`
        let qMtMember = `SELECT COUNT(fid) as count_taskforce from v_current_error_2 WHERE fstart_time BETWEEN '${req.query.start_time}' AND '${req.query.end_time}' AND fdur >= 60`

        cmdMultipleQuery(qCountTaskforce + ';' + qMtMember)
            .then((result) => {
                console.log(result);
                let resObj = {
                    count_member_finished: result[0][0].count_taskforce,
                    count_member_notyet: result[1][0].count_taskforce
                }
                gettingSuccess(res, resObj)
            }).catch((err) => {
                gettingError(res, err)
            });
    },
    getTaskforce: (req, res) => {
        let qDetailTF = `SELECT * from v_current_error_2 WHERE fstart_time BETWEEN '${req.query.start_time}' AND '${req.query.end_time}' AND ferror_name LIKE '%[TASKFORCE]%'`
        cmdMultipleQuery(qDetailTF).then((result) => {
            gettingSuccess(res, result)
        }).catch((err) => {
            gettingError(res, err)
        });
    },
    getNotyetTF: (req, res) => {
        let qMtMember = `SELECT * from v_current_error_2 WHERE fstart_time BETWEEN '${req.query.start_time}' AND '${req.query.end_time}' AND fdur >= 60`
        cmdMultipleQuery(qMtMember).then((result) => {
            gettingSuccess(res, result)
        }).catch((err) => {
            gettingError(res, err)
        });
    }
}