const cmdMultipleQuery = require('../../config/MultipleQueryConnection')


module.exports = {
    getOeeAllLines: (req, res) => {
        let qOeeLinesOfMonth = `SELECT 
            fline, 
            CAST(AVG(t.fvalue / 10) AS DECIMAL(7,1) ) as favg_oee, 
            fdate FROM (
                SELECT 
                    fline, 
                    fvalue, 
                    fshift, 
                    fdate 
                        FROM 
                    tb_oee_log 
                WHERE fshift = 1 
                    UNION 
                SELECT fline, fvalue, fshift, fdate FROM 
                tb_oee_log WHERE fshift = 2) t 
            WHERE MONTH(fdate) = MONTH(NOW()) AND year(fdate) = year(now()) group by fdate,fline order by fdate ASC`
        let q2 = `SELECT fid, fline, fmc_name, fstart_time, fdur, fshift, ferror_name
FROM v_current_error_2 
WHERE fline IN ('LPDC', 'HPDC', 'Crank Shaft', 'Cam Shaft', 'Cylinder Head', 'Cylinder Block', 'ASSY LINE') AND YEAR(fstart_time) = YEAR(NOW()) AND MONTH(fstart_time) = MONTH(NOW()) ORDER BY fdur DESC`
        cmdMultipleQuery(`${qOeeLinesOfMonth};${q2}`)
            .then((result) => {
                var groupResults = result[0].reduce(function(r, a) {
                    r[a.fline] = r[a.fline] || [];
                    r[a.fline].push(a);
                    return r;
                }, Object.create(null))
                var groupResultsProb = result[1].reduce(function(r, a) {
                    r[a.fline] = r[a.fline] || [];
                    r[a.fline].push(a);
                    return r;
                }, Object.create(null))
                console.log(groupResultsProb);
                let arrRes = []

                function getSum(total, num) {
                    return total + Math.round(num);
                }
                for (let key in groupResults) {
                    console.log(groupResults[key]);
                    let mapResDur = groupResultsProb[key].map(item => {
                        return item.fdur
                    })
                    arrRes.push({
                        name: key,
                        dataOee: groupResults[key],
                        dataProblem: groupResultsProb[key].splice(0, 2),
                        dataSumDur: mapResDur.reduce(getSum, 0)
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
    }
}