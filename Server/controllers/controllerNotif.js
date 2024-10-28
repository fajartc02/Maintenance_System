const cmdQuery = require('../config/MysqlConnection');
var axios = require("axios");
var qs = require("qs");
const cmdMultipleQuery = require('../config/MultipleQueryConnection');

function configWa(msg, receiverNo, res) {
    var data = qs.stringify({
        token: "nRRMT4Jomzf5vyn4DU1p4ywDuZ7pdYwDnULfGTlrAsVAMWcpeT",
        number: receiverNo,
        message: msg,
    });
    var config = {
        method: "post",
        url: "https://app.ruangwa.id/api/send_express",
        headers: {},
        data: data,
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            res.status(200).json({
                message: 'notif success send',
                data: response.data
            })
        })
        .catch(function (error) {
            res.status(500).json({
                message: 'failed to send notif',
                err: error
            })
        });
}

function sendNotif(data, cb, res) {
    let noFajar = '082211511213'
    let noPakBasuki = '087875568838'

    // DIV
    let noPakHeru = '08121055822'

    // LH
    let noPakTri = '081398630450'
    let noPakHerman = '081249003958'
    let noPakFerdi = '081297293760'
    let noPakWahyu = '081384422215'
    let noPakTanto = '082120790057'
    let noPakFandi = '081210828775'

    // SH
    let noPakAris = '081289986941'
    let noPakDede = '08111112427'
    let noPakOjat = '081315325626'
    let noPakAbidin = '087741471758'
    let noPakZahroni = '082127284215'

    // STAFF
    let noGaluh = '089664549517'
    let noAceng = '087823613724'
    let noPaTuk = '08980018728'
    let noPakSupri = '082312595026'

    // MANAGER
    let noPakEdi = '08121055608';
    let noPakParman = '081282040900';
    let noPakDaud = '08176069440';
    let arrKeys = ["LINE", "START TIME", 'MACHINE', "ERROR NAME", "DURATION", "MP", "LINK"]
    let messageInfo = ''
    for (let i = 0; i < data.length; i++) {
        if (i > 0) {
            messageInfo += '\n'
        }
        if (i == 6) {
            let newData = `https://smartandonsys.web.app/editProblem?v_=${data[i]}`
            data[i] = newData
        }
        messageInfo += `*${arrKeys[i]}* :\n${data[i]}`
        if (i == 4) {
            messageInfo += ' Min'
        }

        if (data[i] == '') {
            isPushNotif = false;
        }
    }
    var message = `===SMART NOTIFICATION=== \n\n${messageInfo}\n\nhttps://smartandonsys.web.app \n\nTolong di save nomer ini jadi \n\nSMART ANDON`
    // console.log(data[4] > );
    let qSelectNotif = `SELECT * FROM tb_notif WHERE line LIKE '%${data[0]}%'`
    cmdQuery(qSelectNotif)
        .then((resNotif) => {
            // console.log(resNotif[0].isSentLh == 0);
            // console.log(data[4] >= 15);
            if (data[4] >= 15 && data[4] < 30 && resNotif[0]?.isSentLh == 0) {
                configWa(message, noPakWahyu, res)
                configWa(message, noPakTri, res)
                configWa(message, noPakHerman, res)
                configWa(message, noPakFandi, res)
                configWa(message, noPakFerdi, res)
                configWa(message, noPakTanto, res)
                configWa(message, noFajar, res)
                configWa(message, noAceng, res)
                configWa(message, noGaluh, res)
                configWa(message, noPakSupri, res)
                configWa(message, noPaTuk, res)
                let qUpdateSentStatus = `UPDATE tb_notif SET isSentLh = true WHERE line LIKE '%${data[0]}%'`
                cmdQuery(qUpdateSentStatus)
                    .then((result) => {
                        console.log(result)
                        console.log(result.result);
                    }).catch((err) => {
                        console.log(err)
                    });
            } else if (data[4] >= 30 && data[4] < 60 && resNotif[0].isSentSh == 0) {
                configWa(message, noPakAris, res)
                configWa(message, noPakDede, res)
                configWa(message, noPakOjat, res)
                configWa(message, noPakAbidin, res)
                configWa(message, noPakZahroni, res)
                configWa(message, noFajar, res)
                configWa(message, noAceng, res)
                configWa(message, noGaluh, res)
                configWa(message, noPakSupri, res)
                configWa(message, noPaTuk, res)
                let qUpdateSentStatus = `UPDATE tb_notif SET isSentSh = true WHERE line LIKE '%${data[0]}%'`
                cmdQuery(qUpdateSentStatus)
                    .then((result) => {
                        console.log(result)
                        console.log(result.result);
                    }).catch((err) => {
                        console.log(err)
                    });
            } else if (data[4] >= 60 && data[4] < 120 && resNotif[0].isSentAm == 0) {
                configWa(message, noPakBasuki, res)
                configWa(message, noFajar, res)
                configWa(message, noAceng, res)
                configWa(message, noGaluh, res)
                configWa(message, noPakSupri, res)
                configWa(message, noPaTuk, res)
                let qUpdateSentStatus = `UPDATE tb_notif SET isSentAm = true WHERE line LIKE '%${data[0]}%'`
                cmdQuery(qUpdateSentStatus)
                    .then((result) => {
                        console.log(result)
                        console.log(result.result);
                    }).catch((err) => {
                        console.log(err)
                    });
            } else if (data[4] >= 120 && resNotif[0].isSentDiv == 0) {
                // configWa(message, noPakDaud, res)
                configWa(message, noPakEdi, res)
                configWa(message, noPakParman, res)
                configWa(message, noPakDaud, res)
                configWa(message, noPakHeru, res)
                configWa(message, noFajar, res)
                configWa(message, noAceng, res)
                configWa(message, noGaluh, res)
                configWa(message, noPakSupri, res)
                configWa(message, noPaTuk, res)
                let qUpdateSentStatus = `UPDATE tb_notif SET isSentDiv = true WHERE line LIKE '%${data[0]}%'`
                cmdQuery(qUpdateSentStatus)
                    .then((result) => {
                        console.log(result)
                        console.log(result.result);
                    }).catch((err) => {
                        console.log(err)
                    });
            }
            cb(message)
        })
}

function getProblemActive(line, cb) {
    let q = `SELECT  * FROM v_current_error_2 where fend_time IS NULL AND fline LIKE '%${line}%'`;

    cmdQuery(q)
        .then((result) => {
            cb(result)
        }).catch((err) => {
            cb(err)
        });
}

function getCurrentStop(cb) {
    let arrLines = ['LPDC', 'HPDC', 'CAM SHAFT', 'CRANK SHAFT', 'CYLINDER HEAD', 'CYLINDER BLOCK', 'ASSY LINE']
    for (let i = 0; i < arrLines.length; i++) {
        const line = arrLines[i];
        let qDurCurStop = `SELECT fline, fdur FROM v_current_error_2 WHERE fend_time IS NULL AND fline LIKE '%${line}%' ORDER BY fdur DESC LIMIT 1`
        // console.log(qDurCurStop);
        cmdQuery(qDurCurStop)
            .then((resDurCurStop) => {
                // console.log(resDurCurStop);
                if (resDurCurStop.length > 0) {
                    // [ RowDataPacket { fline: 'Cylinder Block', fdur: 5 } ]
                    cb(resDurCurStop)
                } else {
                    cb(false)
                }
            })
            .catch(err => {
                cb(false)
            })
    }
}

const { getAllCountermeasure, getNotifLeader } = require('../functions/notification/countermeasure')
module.exports = {
    sendNotifWhatsapp: (req, res) => {
        var containerFalse = []
        getCurrentStop((result) => {
            console.log('THIS RES NOTIF');
            if (result.length > 0) {
                containerFalse.push(true)
                // [ RowDataPacket { fline: 'Cylinder Block', fdur: 5 } ]
                let dur = result[0].fdur
                getProblemActive(result[0].fline, (resProblem) => {
                    if (resProblem.length > 0) {
                        // ["LINE", "START TIME", 'MACHINE', "ERROR NAME", "DURATION", "MP"]
                        // console.log(resProblem[0].fstart_time);
                        let d = new Date(resProblem[0].fstart_time)
                        Number.prototype.padLeft = function (base, chr) {
                            var len = (String(base || 10).length - String(this).length) + 1;
                            return len > 0 ? new Array(len).join(chr || '0') + this : this;
                        }
                        let dformat = [d.getDate().padLeft(),
                        (d.getMonth() + 1).padLeft(),
                        d.getFullYear()
                        ].join('/') + ' ' + [d.getHours().padLeft(),
                        d.getMinutes().padLeft(),
                        d.getSeconds().padLeft()
                        ].join(':');
                        let data = [resProblem[0].fline, dformat, resProblem[0].fmc_name, resProblem[0].ferror_name, dur, resProblem[0].foperator, resProblem[0].fid]
                        sendNotif(data, (resNotif) => {
                            console.log('THIS RES NOTIF');
                            console.log(resNotif);
                        }, res)
                    }
                })
            } else {
                containerFalse.push(false)
                let lines = ['LPDC', 'HPDC', 'CAM SHAFT', 'CRANK SHAFT', 'CYLINDER HEAD', 'CYLINDER BLOCK', 'ASSY LINE']
            }
        })
        res.status(200).json({
            message: 'Success to set notif',
        })
    },
    sendWhatsapp: (req, res) => {
        let arrLine = [{
            fline: 'CAM SHAFT',
            query: 'CAM'
        },
        {
            fline: 'CRANK SHAFT',
            query: 'CR'
        },
        {
            fline: 'CYLINDER HEAD',
            query: 'CH'
        },
        {
            fline: 'CYLINDER BLOCK',
            query: 'CB'
        },
        {
            fline: 'ASSY LINE',
            query: 'ASSY'
        },
        {
            fline: 'LPDC',
            query: 'LP'
        },
        {
            fline: 'HPDC',
            query: 'DC'
        }
        ]
        let searchLine = arrLine.filter(line => {
            if (line.fline === req.body.targetLine.toUpperCase()) {
                return line.query
            }
        })
        // QUERY SEND FEEDBACK
        // if GH / TM => (query: fshift, frole,)
        // targetRole, fline, role, 
        console.log(searchLine);
        let q = `SELECT * FROM tb_mt_member 
            WHERE fshift = '${req.body.shift}' AND fline LIKE '%${searchLine[0].query}%'`
        if (req.body.targetRole.includes(',')) {
            let arrTarget = req.body.targetRole.split(',')
            q += ' AND ('
            for (let i = 0; i < arrTarget.length; i++) {
                const element = arrTarget[i];
                q += `frole = '${element}'`
                if (i < arrTarget.length - 1) {
                    q += ' OR '
                }
            }
            q += ')'
        } else {
            q += ` AND frole = '${req.body.targetRole}'`
        }
        console.log(q);
        cmdMultipleQuery(q)
            .then((result) => {
                let judg = false
                let responseData;
                if (result.length > 1) {
                    for (let j = 0; j < result.length; j++) {
                        const element = result[j];
                        var data = qs.stringify({
                            token: "nRRMT4Jomzf5vyn4DU1p4ywDuZ7pdYwDnULfGTlrAsVAMWcpeT",
                            number: element.fwa_no,
                            message: `${req.body.message} \n - Pak ${element.fname}`,
                        });
                        var config = {
                            method: "post",
                            url: "https://app.ruangwa.id/api/send_express",
                            headers: {},
                            data: data,
                        };
                        axios(config)
                            .then(function (response) {
                                console.log(JSON.stringify(response.data));
                                judg = true
                                responseData = JSON.stringify(response.data)
                            })
                            .catch(function (error) {
                                judg = false
                                responseData = JSON.stringify(error)
                            });
                    }
                    if (judg) {
                        res.status(200).json({
                            message: 'notif success send',
                            data: responseData
                        })
                    }
                } else {
                    var data = qs.stringify({
                        token: "nRRMT4Jomzf5vyn4DU1p4ywDuZ7pdYwDnULfGTlrAsVAMWcpeT",
                        number: result[0].fwa_no,
                        message: `${req.body.message} \n - Pak ${result[0].fname}`,
                    });
                    var config = {
                        method: "post",
                        url: "https://app.ruangwa.id/api/send_express",
                        headers: {},
                        data: data,
                    };

                    axios(config)
                        .then(function (response) {
                            console.log(JSON.stringify(response.data));
                            res.status(200).json({
                                message: 'notif success send',
                                data: response.data
                            })
                        })
                        .catch(function (error) {
                            res.status(500).json({
                                message: 'failed to send notif',
                                err: error
                            })
                        });
                }
            }).catch((err) => {
                console.log(err);
            });
    },
    notifCmWa: (req, res) => {
        console.log('masuk notif');
        getAllCountermeasure(getNotifLeader)
        res.status(201).json({
            message: 'notifikasi berhasil di jalankan',
        })
    }
}