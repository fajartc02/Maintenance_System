const cmdMultipleQuery = require('../config/MultipleQueryConnection');

let regexParseX = new RegExp('x', 'g')

function gettingError(res, err) {
    return res.status(203).json({
        message: 'Error',
        err: err.message
    })
}

module.exports = {
    ruleParamManual: (req, res, next) =>{
        let {id_m_parameter, value, clock} = req.body
        let q = `
        SELECT mp.fid AS id_parameter, msev.fid AS id_severity, mmc.fmc_name AS mc_name, mp.name AS param_name, mtp.rule AS rule, msev.fname AS severity FROM m_treshold_parameter mtp
            INNER JOIN m_parameter mp
                ON mp.fid = mtp.id_m_parameter
            INNER JOIN tb_mc mmc
                ON mmc.fid = mp.mc_id
            INNER JOIN m_severity msev
                ON msev.fid = mtp.id_m_severity
        WHERE mp.fid = ${id_m_parameter}`
    cmdMultipleQuery(q)
    .then(result => {
        // console.log(result);
        let nextResult;
        result.forEach(item => {
            let parseRule = item.rule.replace(regexParseX, value)
            let isTrue = eval(parseRule)
            if(isTrue) {
                console.log(item);
                nextResult = item
                res.locals.data = {
                    id_m_parameter: item.id_parameter,
                    id_m_severity: item.id_severity,
                    value: value,
                    clock: clock
                }
            }
        })
        if(nextResult) {
            next()
        }
    })
    .catch(err => {
        console.log(err);
        gettingError(res, err)
    })
        console.log('masukkk');
    }
}