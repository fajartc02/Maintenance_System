const cmdMultipleQuery = require('../config/MultipleQueryConnection');
const brain = require('brain.js')
    // const net = new brain.recurrent.LSTM();

// net.train(['I am brainjs, Hello World!']);
// const output = net.run('I am brainjs');
// console.log(output);

function configWa(msg, receiverNo) {
    var axios = require('axios');
    var FormData = require('form-data');
    var data = new FormData();
    data.append('token', 'BfsLoRiDyDU4MJfzCZEZDNbubWob7OIjvo2un9TDwCbF4Lt5OP');
    data.append('phone', receiverNo);
    data.append('message', msg);

    var config = {
        method: 'post',
        url: 'http://ruangwa.com/v2/api/send-message.php',
        headers: {
            ...data.getHeaders()
        },
        data: data
    };

    axios(config)
        .then(function(response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function(error) {
            console.log(error);
        });
}

module.exports = {
    getCmFollowup: (req, res) => {
        // console.log(brain);
        let startDate = ''
        let endDate = ''
        let fline = ''
        let fmc_name = ''
        let ferror_name = ''
        let fshift = ''
        let isFullCap = false

        if (String(req.query.ferror_name ? req.query.ferror_name.toUpperCase() : null).includes('FULLCAP')) {
            isFullCap = true
        }
        console.log(isFullCap);

        if (req.query.startDate) {
            startDate = `${req.query.startDate}`
        }
        if (req.query.endDate) {
            endDate = `${req.query.endDate}`
        }
        if (req.query.fline) {
            fline = ` AND fline LIKE '%${req.query.fline}%'`
        }
        if (req.query.fmc) {
            fmc_name = ` AND fmc_name LIKE '%${req.query.fmc}%'`
        }
        if (req.query.ferror_name) {
            ferror_name = ` AND ferror_name LIKE '%${req.query.ferror_name}%'`

        }
        if (req.query.shift) {
            fshift = ` AND fshift = '${req.query.shift}'`
        }
        let q = `SELECT 
            fid,
            fline,
            fmc_name,
            ferror_name,
            fstart_time,
            freal_prob,
            foperator,
            fdur,
            fpermanet_cm,
            fpermanet_cm_lama,
            fyokoten
        FROM v_current_error_2
        WHERE
            (fpermanet_cm LIKE '%[{%' OR
            fpermanet_cm_lama LIKE '%[{%' OR fyokoten LIKE '%[{%') AND
            fend_time IS NOT NULL AND
            date(fstart_time) >= date('${startDate}') AND 
            date(fstart_time) <= date('${endDate}')${fline}${fmc_name}${ferror_name}${fshift}${isFullCap ? "" : " AND fdur >= 30"}`

        let qCountCmNotYet = `SELECT 
            COUNT(*) AS totalCmNotYet
        FROM v_current_error_2
        WHERE
            (fpermanet_cm LIKE '%"judg":false%' OR
            fpermanet_cm_lama LIKE '%[{%') AND
            fend_time IS NOT NULL AND
            date(fstart_time) >= date('${startDate}') AND 
            date(fstart_time) <= date('${endDate}')${fline}${fmc_name}${ferror_name}${fshift}${isFullCap ? "" : " AND fdur >= 30"}`

        let qCountCmOk = `SELECT 
            COUNT(*) AS totalCmOk
        FROM v_current_error_2
        WHERE
            (fpermanet_cm LIKE '%"judg":true%' OR
            fpermanet_cm_lama LIKE '%[{%') AND
            fend_time IS NOT NULL AND
            date(fstart_time) >= date('${startDate}') AND 
            date(fstart_time) <= date('${endDate}')${fline}${fmc_name}${ferror_name}${fshift}${isFullCap ? "" : " AND fdur >= 30"}`
        let containerQuery = []
        containerQuery.push(q)
        containerQuery.push(qCountCmNotYet)
        containerQuery.push(qCountCmOk)
        console.log(q);
        cmdMultipleQuery(containerQuery.join(';'))
            .then((result) => {
                // console.log(result)
                res.status(200).json({
                    message: 'Success to get contermeasure followup',
                    data: result[0],
                    cntCmNotYet: result[1][0].totalCmNotYet,
                    cntCmOk: result[2][0].totalCmOk
                })
            }).catch((err) => {
                res.status(500).json({
                    message: 'Error to get contermeasure followup',
                    err: err
                })
            });
    },
    updateCmFinished: (req, res) => {
        let q = `UPDATE tb_error_log_2
        SET `
        let containerColumn = []
        let querySetCol = ''
        if (req.body.fpermamnet_cm) {
            containerColumn.push(`fpermanet_cm = '${req.body.fpermamnet_cm}'`)
        }
        if (req.body.fpermanet_cm_lama) {
            containerColumn.push(`fpermanet_cm_lama = '${req.body.fpermamnet_cm_lama}'`)
        }
        if (containerColumn.length > 1) {
            querySetCol = containerColumn.join(',')
        } else {
            querySetCol = containerColumn[0]
        }
        if (req.query.fpermanet_cm) {
            q += `${querySetCol} WHERE fpermanet_cm LIKE '%${req.query.fpermanet_cm}%'`
        } else if (req.query.fpermanet_cm_lama) {
            q += `${querySetCol} WHERE fpermanet_cm_lama LIKE '%${req.query.fpermanet_cm_lama}%'`
        }
        console.log(q);
        cmdMultipleQuery(q)
            .then((result) => {
                res.status(201).json({
                    message: 'Success to finished countermeasure',
                    data: result
                })
            }).catch((err) => {
                res.status(500).json({
                    message: 'Error to finished countermeasure',
                    err: err.message
                })
            });
    },
    notifCm: (req, res) => {
        let q = `SELECT * FROM tb_notif`;
    }
}