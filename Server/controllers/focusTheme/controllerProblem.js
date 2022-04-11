const cmdMultipleQuery = require('../../config/MultipleQueryConnection');

async function gettingSuccess(res, data) {
    return await res.status(200).json({
        message: 'OK',
        data
    })
}

function gettingError(res, err) {
    return res.status(200).json({
        message: 'Err',
        err
    })
}


module.exports = {
        getParetoData: (req, res) => {
                let { isMachine = null, isOrderFreq = null, fstart_date, fend_date, fline, fmc_name = null, fav_categoty = null } = req.query
                let queryParetoMc = `SELECT
                ${fmc_name ? `fid,` : ''}
            ${isMachine ? 'fmc_name,' : 'ferror_name,'}
            ${isOrderFreq ? 'count(fid) AS freq,' : 'sum(fdur) AS fdur,'}
            fline,
            id_m_problem_member
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
            ${isOrderFreq ? 'freq' : 'fdur'} desc
        LIMIT 5`
        console.log(queryParetoMc);
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
        let { id_m_member, id_m_problem, date_plan } = req.body
        let queryAddTheme = `INSERT INTO m_problem_member
            (
                id_m_member, 
                id_m_problem, 
                date_plan
            ) 
                VALUES
            (
                ${id_m_member},
                ${id_m_problem},
                '${date_plan}'
            )`


        cmdMultipleQuery(`${queryAddTheme}`)
            .then((result) => {
                console.log(result.insertId)
                let id_problem_member = result.insertId
                let queryUpdateErr = `UPDATE tb_error_log_2
                SET id_m_problem_member = ${id_problem_member} WHERE fid = ${id_m_problem}`
                cmdMultipleQuery(queryUpdateErr)
                    .then((result) => {
                        console.log(result)
                    }).catch((err) => {
                        console.error(err);
                    });
            }).catch((err) => {
                console.error(err);
            });
    }
}