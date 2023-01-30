const cmdMultipleQuery = require('../../config/MultipleQueryConnection');

module.exports = {
    getMachinesStatus: (req, res) => {
        let q = `select tmc.fid, tmc.line_id, tmc.fline as line_nm, tmc.fmc_name as machine_nm, tmc.fop_desc, CAST(ts.fstatus as INT) as status, tmc.idx_pos from tb_status ts
join tb_mc tmc
		on ts.fid = tmc.fid
where tmc.line_id = 2  order by tmc.idx_pos asc`
            // AND tmc.fmc_name like '%1'
        cmdMultipleQuery(q)
            .then((result) => {
                let lines = [{
                    line_nm: "HPDC",
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
                    }, ],
                }]
                console.log(lines)
                res.status(200).json({
                    message: 'ok',
                    data: lines
                })
            }).catch((err) => {
                console.log(err)
            });
    }
}