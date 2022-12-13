const cmdMultipleQuery = require("../../config/MultipleQueryConnection");
const formatDate = require('../../functions/formatDate')

var axios = require("axios");
var qs = require("qs");

function configWa(msg, receiverNo, category) {
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
        .then(function(response) {
            console.log(JSON.stringify(response.data));
            cmdMultipleQuery(`INSERT INTO o_notif (msg, category) VALUES ('${JSON.stringify(response.data)}', '${category}')`)
                // res.status(200).json({
                //     message: 'notif success send',
                //     data: response.data
                // })
        })
        .catch(function(error) {
            console.log(error);
            // res.status(500).json({
            //     message: 'failed to send notif',
            //     err: error
            // })
        });
}

module.exports = {
    getAllCountermeasure: (getNotifLeader) => {
        let qGetCmTerjadi = `select fid, fstart_time, fshift,ferror_name, line_id, fline, fmc_name, fpermanet_cm from v_current_error_2 where fpermanet_cm LIKE '%[{%' AND fstart_time BETWEEN '${formatDate.YYYYMMDD(new Date().getTime() - 1000 * 60 * 60 * 24 * 90)}' AND '${formatDate.YYYYMMDD(new Date().getTime())}' AND ferror_name LIKE "%[TASKFORCE]%"`
        return cmdMultipleQuery(qGetCmTerjadi)
            .then(async(result) => {
                let mapResultCm = result.map(item => {
                    return {
                        item,
                        parse: JSON.parse(item.fpermanet_cm).filter(itm => { return itm.judg == false })
                    }
                })
                let filterCmFalsy = mapResultCm.filter(itm => { return itm.parse.length > 0 })
                    // console.log(filterCmFalsy);
                let leaderList = await getNotifLeader()
                    // console.log(leaderList);
                filterCmFalsy.forEach(itm => {
                        let findLeader = leaderList.filter(leader => {
                                console.log(leader.id_m_line);
                                console.log(itm.item.line_id);
                                return leader.id_m_line === itm.item.line_id
                            })
                            // console.log(itm.parse);
                            // console.log(findLeader);
                        let msgHeaderTemplate = `*SMART COUNTERMEASURE REMINDER*\n`
                        let msgInfoTemplate = `Line: ${itm.item.fline}\nMc: ${itm.item.fmc_name}\n\n`
                        let msgLink = `\n\nUntuk Detail:\n https://smartandonsys.web.app/editProblem?v_=${itm.item.fid}`
                        let container = itm.parse.map((cm, i) => {
                                let status;
                                let days = Math.floor((new Date(cm.datePlan).getTime() - new Date().getTime()) / 1000 / 60 / 60 / 24)

                                if (days <= 3 && days >= 0) {
                                    // H-3 until H
                                    status = `Ayo Prepare H-${days} Deadline`
                                    return `(${i + 1}) Desc:${cm.cmDesc}\nPlan:${cm.datePlan}\nPIC:${cm.pic}\nStatus:${status}`
                                } else if (days == 0) {
                                    status = `Today Deadline`
                                    return `(${i + 1}) Desc:${cm.cmDesc}\nPlan:${cm.datePlan}\nPIC:${cm.pic}\nStatus:${status}`
                                } else if (days < -3) {
                                    status = `*Delay ${days * -1} Hari*`
                                    return `(${i + 1}) Desc:${cm.cmDesc}\nPlan:${cm.datePlan}\nPIC:${cm.pic}\nStatus:${status}`
                                }
                            })
                            // console.log(msgHeaderTemplate);
                            // console.log(msgInfoTemplate);
                            // console.log(container.join('\n'));
                        let msg = msgHeaderTemplate + msgInfoTemplate + container.join('\n') + msgLink
                        console.log(msg);
                        if (container.length > 0) {
                            console.log('FIND LEADER');
                            console.log(findLeader);
                            findLeader.forEach(leadMt => {
                                // configWa(msg, leadMt.fwa_no, 'CM TERJADI')
                            })
                        }

                    })
                    // return filterCmFalsy
            }).catch((err) => {
                console.log(err)
            });
    },
    getNotifLeader: () => {
        let q = `select fname, frole, fwa_no, mlm.id_m_line as id_m_line, tl.fline from m_line_member mlm
	JOIN tb_mt_member tmm
		on tmm.fid = mlm.id_m_mt_member
	JOIN tb_line tl
		on tl.fid = mlm.id_m_line`

        return cmdMultipleQuery(q)
            .then((result) => {
                return result
                    // 
            }).catch((err) => {
                console.log(err)
            });
    }
}