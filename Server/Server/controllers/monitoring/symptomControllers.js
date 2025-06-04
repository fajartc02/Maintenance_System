const cmdMultipleQuery = require('../../config/MultipleQueryConnection');

module.exports = {
    getData: {
        machinesStatus: async (req, res) => {
            let q = `SELECT 
	tmcp.fid,
	tmcp.fmc_name as machine_nm,
	(
        SELECT
			COUNT(tmc.fid)
		FROM 
			tb_mc tmc
		JOIN tb_line tbl
			ON tmc.line_id = tbl.fid
		JOIN tb_m_parameters_new tmpn
			ON tmpn.machine_id = tmc.fid	
		JOIN tb_r_parameter_log trpl
			ON trpl.param_id = tmpn.param_id
		WHERE tmcp.fid = tmc.fid
			AND 
				(
                    (trpl.vals < tmpn.upper_limit AND trpl.vals >= tmpn.warning_ul) 
                    OR 
                    (trpl.vals > tmpn.lower_limit AND trpl.vals <= tmpn.warning_ll)
                                                
                )
			AND
			trpl.created_at <= '${req.query.start}'
			ORDER BY trpl.created_at DESC LIMIT 4
    ) as total_alarm_warning,
    (
        SELECT
			COUNT(tmc.fid)
		FROM 
			tb_mc tmc
		JOIN tb_line tbl
			ON tmc.line_id = tbl.fid
		JOIN tb_m_parameters_new tmpn
			ON tmpn.machine_id = tmc.fid	
		JOIN tb_r_parameter_log trpl
			ON trpl.param_id = tmpn.param_id
		WHERE tmcp.fid = tmc.fid
			AND
			trpl.created_at <= '${req.query.start}'
			AND 
				(
						(trpl.vals > tmpn.upper_limit) 
					OR 
						(trpl.vals < tmpn.lower_limit)
				)
			ORDER BY trpl.created_at DESC LIMIT 4
    ) as total_alarm_abnormal
FROM 
	tb_mc tmcp
WHERE 
	tmcp.line_id = ${req.query.line_id ? req.query.line_id : 2}
ORDER BY tmcp.idx_pos ASC`
            console.log(q);
            await cmdMultipleQuery(q)
                .then((result) => {
                    let lines = [{
                        line_nm: result[0].line_nm,
                        areas: [{
                            area_nm: "All",
                            cells: [{
                                cell_nm: "All",
                                machines: result,
                            },],
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
        lineSummarized: async (req, res) => {
            let qGetParamsLength = `SELECT COUNT(param_id) FROM tb_m_parameters_new`
            let q = `SELECT 
        tlp.fid as line_id,
    tlp.fline,
        (
                SELECT
                        COUNT(tbl.fid)
                FROM 
                        tb_mc tmc
                JOIN tb_line tbl
                        ON tmc.line_id = tbl.fid
                JOIN tb_m_parameters_new tmpn
                        ON tmpn.machine_id = tmc.fid
                JOIN (
                	SELECT * FROM tb_r_parameter_log
                	ORDER BY created_at DESC LIMIT 4
                ) trpl
                    ON trpl.param_id = tmpn.param_id
                WHERE tbl.fid = tlp.fid
        AND
                        trpl.created_at <= ' ${req.query.start}' 
                        AND 
                                (
                    (trpl.vals < tmpn.upper_limit AND trpl.vals >= tmpn.warning_ul) 
                    OR 
                    (trpl.vals > tmpn.lower_limit AND trpl.vals <= tmpn.warning_ll)
                                                
                )
        ) as total_warning,
        (
                SELECT
                        COUNT(tbl.fid)
                FROM 
                        tb_mc tmc
                JOIN tb_line tbl
                        ON tmc.line_id = tbl.fid
                JOIN tb_m_parameters_new tmpn
                        ON tmpn.machine_id = tmc.fid
                JOIN (
                	SELECT * FROM tb_r_parameter_log
                	ORDER BY created_at DESC LIMIT 4
                ) trpl
                        ON trpl.param_id = tmpn.param_id
                WHERE tbl.fid = tlp.fid 
        AND
                        trpl.created_at <= '${req.query.start}'
                        AND 
                                (
                                                (trpl.vals > tmpn.upper_limit) 
                                        OR 
                                                (trpl.vals < tmpn.lower_limit)
                                ) 
        ) as total_abnormal
FROM 
        tb_line tlp
WHERE 
        tlp.parent_id IS NULL`
            console.log(q);
            await cmdMultipleQuery(q)
                .then((result) => {
                    res.status(200).json({
                        message: 'ok',
                        data: result
                    })
                }).catch((err) => {
                    res.status(500).json({
                        message: 'err'
                    })
                });
        }
    }
}