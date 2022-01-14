const cmdMultipleQuery = require('../../config/MultipleQueryConnection');

function gettingSuccess(res, data) {
    return res.status(200).json({
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
    insertParam: (req, res) => {
        let {id_m_parameter, id_m_severity, clock, value} = res.locals.data
        console.log(res.locals.data);
        let q = `INSERT INTO 
            o_history_parameter_value 
            (id_m_parameter, id_m_severity, clock, value) 
                VALUES 
            (${id_m_parameter}, ${id_m_severity}, '${clock}', ${value})`
        cmdMultipleQuery(q)
        .then(result => {
            gettingSuccess(res, result)
        })
        .catch(err => {
            gettingError(res, err)
        })
    },
    getParameterList: (req, res) => {
        let q = `SELECT * FROM v_machine_parameter`
        let keyCol = Object.keys(req.query)[0]
        console.log(keyCol);
        if(keyCol) {
            q += ` WHERE ${keyCol} = ${req.query[keyCol]}`
        }
        cmdMultipleQuery(q)
        .then(result => {
            gettingSuccess(res, result)
            console.log(result);
        })
        .catch(err => {
            gettingError(res, err)
            console.log(err);
        })
    },
    getMachineParameter: (req, res) => {
        let q = `SELECT DISTINCT id_machine, mc_name FROM v_machine_parameter`
        cmdMultipleQuery(q)
        .then(result => {
            gettingSuccess(res, result)
            console.log(result);
        })
        .catch(err => {
            gettingError(res, err)
            console.log(err);
        })
    }
}