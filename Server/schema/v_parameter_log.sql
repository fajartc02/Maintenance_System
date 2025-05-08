CREATE VIEW v_parameter_log AS
select
    ohpv.fid AS id,
    tm.fline AS fline,
    tm.fid AS id_mc,
    tm.fmc_name AS fmc_name,
    mp.fid AS id_param,
    mp.name AS param_name,
    ohpv.value AS value,
    mp.upper_limit AS upper_limit,
    mp.lower_limit AS lower_limit,
    mp.units AS units,
    msev.fname AS severity
from
    o_history_parameter_value ohpv
    INNER JOIN m_parameter mp ON ohpv.id_m_parameter = mp.fid
    INNER JOIN tb_mc tm ON ohpv.id_m_machine = tm.fid
    INNER JOIN m_severity msev ON ohpv.id_m_severity = msev.fid