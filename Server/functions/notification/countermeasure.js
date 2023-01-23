const cmdMultipleQuery = require("../../config/MultipleQueryConnection");
const formatDate = require('../../functions/formatDate')

const configWa = require('./configWa')

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
                        let msgInfoTemplate = `Line: ${itm.item.fline}\nMc: ${itm.item.fmc_name}\nProblem:${itm.ferror_name}\n\n`
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
                                configWa(msg, leadMt.fwa_no, 'CM TERJADI')
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