const cmdMultipleQuery = require('../../config/MultipleQueryConnection')


module.exports = {
    getOeeAllLines: (req, res) => {
        let qOeeLinesOfMonth = `SELECT 
            UPPER(fline) as fline, 
            CAST(AVG(t.fvalue / 10) AS DECIMAL(7,1) ) as favg_oee,
            fdate FROM (
                SELECT 
                    UPPER(fline) as fline, 
                    fvalue, 
                    fshift, 
                    fdate,
                    fmanual 
                        FROM 
                    tb_oee_log 
                WHERE fshift = 1  
                    UNION 
                SELECT UPPER(fline) as fline, fvalue, fshift, fdate,fmanual FROM 
                tb_oee_log WHERE fshift = 2) t 
            WHERE fmanual = 1 AND MONTH(fdate) = MONTH(NOW()) AND year(fdate) = year(now()) group by fdate,fline order by fdate ASC`
        let q2 = `SELECT UPPER(fline) as fline, date(fstart_time) as fstart_time, SUM(fdur) as fdur
from v_current_error_2
WHERE MONTH(fstart_time) = MONTH(NOW()) AND year(fstart_time) = year(now())
GROUP BY date(fstart_time),fline
order by fstart_time ASC;`
            //         let q2 = `SELECT fid, fline, fmc_name, fstart_time, fdur, fshift, ferror_name
            // FROM v_current_error_2 
            // WHERE fline IN ('LPDC', 'HPDC', 'Crank Shaft', 'Cam Shaft', 'Cylinder Head', 'Cylinder Block', 'ASSY LINE') AND YEAR(fstart_time) = YEAR(NOW()) AND MONTH(fstart_time) = MONTH(NOW()) ORDER BY fdur DESC`
        cmdMultipleQuery(`${qOeeLinesOfMonth}`)
            .then((result) => {
                var groupResults = result.reduce(function(r, a) {
                        r[a.fline] = r[a.fline] || [];
                        r[a.fline].push(a);
                        return r;
                    }, Object.create(null))
                    // var groupResultsProb = result[1].reduce(function(r, a) {
                    //     r[a.fline] = r[a.fline] || [];
                    //     r[a.fline].push(a);
                    //     return r;
                    // }, Object.create(null))
                    // console.log(groupResultsProb);
                let arrRes = []
                for (let key in groupResults) {
                    console.log(groupResults[key]);
                    arrRes.push({
                        name: key,
                        dataOee: groupResults[key],
                        // dataProblem: groupResultsProb[key].splice(0, 2),
                        // dataSumDur: groupResultsProb[key]
                    })
                }
                res.status(200).json({
                    message: 'Success',
                    data: arrRes
                })
            }).catch((err) => {
                console.log(err);
                res.status(500).json({
                    message: 'ng',
                    err: err.message
                })
            });
    },
    insertOeeLine: (req, res) => {
        let { fline, fdate, fshift, fvalue } = req.body
            // if (fvalue.includes('.')) {
            //     console.log(fvalue);
            // }
        fvalue = (fvalue * 10)
        let q = `INSERT INTO tb_oee_log 
            (fline, fdate, fshift, fvalue, fmanual)
                VALUES
            ('${fline}','${fdate}','${fshift}','${fvalue}', 1)`
        console.log(q);
        cmdMultipleQuery(q)
            .then((result) => {
                res.status(201).json({
                    message: 'ok',
                    data: result
                })
            }).catch((err) => {
                res.status(500).json({
                    message: 'ng',
                    err: err
                })
            });
    }
}