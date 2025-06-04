SELECT
    tlp.fid as line_id,
    tlp.fline,
    (
        SELECT
            COUNT(tbl.fid)
        FROM
            tb_mc tmc
            JOIN tb_line tbl ON tmc.line_id = tbl.fid
            JOIN tb_m_parameters_new tmpn ON tmpn.machine_id = tmc.fid
            JOIN tb_r_parameter_log trpl ON trpl.param_id = tmpn.param_id
        WHERE
            tbl.fid = tlp.fid
            AND (
                (
                    trpl.vals < tmpn.upper_limit
                    OR trpl.vals >= tmpn.warning_ul
                )
                AND (
                    trpl.vals > tmpn.lower_limit
                    OR trpl.vals <= tmpn.warning_ll
                )
                AND trpl.vals < tmpn.upper_limit
                AND trpl.vals > tmpn.lower_limit
            )
    ) as total_warning,
    (
        SELECT
            COUNT(tbl.fid)
        FROM
            tb_mc tmc
            JOIN tb_line tbl ON tmc.line_id = tbl.fid
            JOIN tb_m_parameters_new tmpn ON tmpn.machine_id = tmc.fid
            JOIN tb_r_parameter_log trpl ON trpl.param_id = tmpn.param_id
        WHERE
            tbl.fid = tlp.fid
            AND (
                (trpl.vals > tmpn.upper_limit)
                OR (trpl.vals < tmpn.lower_limit)
            )
    ) as total_abnormal
FROM
    tb_line tlp
WHERE
    tlp.parent_id IS NULL