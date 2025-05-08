const cmdMultipleQuery = require('../../config/MultipleQueryConnection');
const { gettingError, gettingSuccess } = require('../../functions/response')


module.exports = {
    graphTFSelected: (req, res) => {
        let q = `select count(vce2.fid) as total, tl.sname as sname from v_current_error_2 vce2
	join tb_line tl
		on tl.fid = vce2.line_id
where fstart_time between '${req.query.start_time}' AND '${req.query.end_time}' AND ferror_name LIKE '%[TASKFORCE]%'
group by sname
order by fdur`
        console.log(q);
        cmdMultipleQuery(q)
            .then((result) => {
                console.log('GRAPH TF');
                console.log(result);
                gettingSuccess(res, result)
            }).catch((err) => {
                gettingError(res, err)
            });
    },
    graphTFCm: (req, res) => {
        let q = `select 
            tel2.fid,
            tl.sname as fline,
            fpermanet_cm
                from
            tb_error_log_2 tel2
            join tb_mc tm
                on tm.fid = tel2.fmc_id
            join tb_line tl
                on tl.fid = tm.line_id
                where
            fpermanet_cm LIKE '%[{%' AND
            fstart_time between '${req.query.start_time}' AND '${req.query.end_time}' AND 
            ferror_name LIKE "%[TASKFORCE]%"`
        cmdMultipleQuery(q)
            .then(result => {
                let mapResultCm = result.map(item => {
                    return {
                        line: item.fline,
                        cmNotYet: JSON.parse(item.fpermanet_cm).filter(itm => { return itm.judg == false }),
                        cmOk: JSON.parse(item.fpermanet_cm).filter(itm => { return itm.judg == true })
                    }
                })
                let qLine = `SELECT sname FROM tb_line where sname is not null`
                cmdMultipleQuery(qLine)
                    .then((resLines) => {
                        console.log(resLines)
                        let containerRes = []
                        resLines.forEach(line => {
                            let obj = { line: line.sname, total: 0, totalOk: 0 }
                            mapResultCm.forEach((cm, i) => {
                                console.log(cm);
                                if (line.sname == cm.line) {
                                    obj.total += cm.cmNotYet.length + cm.cmOk.length
                                    obj.totalOk += cm.cmOk.length
                                }
                            })
                            containerRes.push(obj)
                        })
                        gettingSuccess(res, containerRes)
                    })
                    .catch((err) => {
                        gettingError(res, err)
                    });
                // 
            })
            .catch(err => {
                gettingError(res, err)
            })
    },
}