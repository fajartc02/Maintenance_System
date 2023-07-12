const { cmdMultipleQuery } = require("../daily-prod-report/functions")

function gettingError(res, err) {
    res.status(500).json({
        message: 'Error',
        err
    })
}

function gettingSuccess(res, status, data) {
    res.status(status).json({
        message: 'ok',
        data
    })
}

module.exports = {
    getProblemAnalisys: async(req, res) => {
        try {
            let filter = ''
            if (req.query.line) filter += `AND fline LIKE '%${req.query.line}%'`

            let q = `
            SELECT 
            fid,fline,fmc_name,ferror_name,HOUR(fstart_time) as start_hr,fstart_time ,CAST(FLOOR((fdur/60)) AS INT) as fdur 
            FROM v_current_error_2 
            WHERE 
                DATE(fstart_time) = DATE('${req.query.filterDate}') 
                AND fend_time IS NOT NULL
                ${filter} 
            ORDER BY fstart_time ASC`
                // console.log(q);
            let problemData = await cmdMultipleQuery(q)
                // console.log(problemData);
            let mapData = problemData.map(problem => {
                let data = []
                for (let i = 0; i < 24; i++) {
                    let maxDur = problem.start_hr + problem.fdur
                    let minDur = problem.start_hr
                    if (problem.start_hr == i || (i >= minDur && i <= maxDur)) {
                        data.push(1);
                        continue;
                    }
                    data.push(0)
                }
                return {
                    line: problem.fline,
                    machine: problem.fmc_name,
                    problem: problem.ferror_name,
                    date: problem.fstart_time,
                    fdur: problem.fdur,
                    data
                }
            })
            console.log(mapData);
            gettingSuccess(res, 200, mapData)
        } catch (error) {
            console.log(error);
            gettingError(res, error)
        }
    }
}