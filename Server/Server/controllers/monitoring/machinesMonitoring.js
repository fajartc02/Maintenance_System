const cmdMultipleQuery = require('../../config/MultipleQueryConnection');

module.exports = {
    getMachinesStatus: (req, res) => {
        let q = `SELECT 
        tmc.fid, 
        tmc.line_id, 
        tmc.fline as line_nm, 
        tmc.fmc_name as machine_nm, 
        tmc.fop_desc, 
        CAST(ts.fstatus as INT) as status, 
        tmc.idx_pos 
FROM tb_status ts
JOIN tb_mc tmc
		on ts.fid = tmc.fid
where tmc.line_id = ${req.query.line_id ? req.query.line_id : 2} order by tmc.idx_pos ASC`
        // AND tmc.fmc_name like '%1'
        cmdMultipleQuery(q)
            .then((result) => {
                console.log(result);
                let lines = [{
                    line_nm: result[0].line_nm,
                    areas: [{
                        area_nm: "All",
                        cells: [{
                            cell_nm: "All",
                            machines: result,
                        },
                            // {
                            //     cell_nm: "DC 2",
                            //     machines: [],
                            // },
                        ],
                    },],
                }]
                res.status(200).json({
                    message: 'ok',
                    data: lines
                })
            }).catch((err) => {
                console.log(err)
                res.status(500).json({
                    message: 'err'
                })
            });
    },
    getDetailAlarm: (req, res) => {
        let q = `SELECT fid, 
            ferror_name, 
            ifnull(timestampdiff(MINUTE,fstart_time,fend_time),timestampdiff(MINUTE,fstart_time,current_timestamp())) AS fdur 
        FROM tb_error_log_2 
        WHERE fend_time is null AND fmc_id = ${req.query.id}`
        cmdMultipleQuery(q)
            .then((result) => {
                console.log(result)
                res.status(200).json({
                    message: 'ok',
                    data: result
                })
            }).catch((err) => {
                console.log(err)
                res.status(500).json({
                    message: 'err'
                })
            });
    }
}