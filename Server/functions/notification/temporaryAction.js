const cmdMultipleQuery = require("../../config/MultipleQueryConnection");
const formatDate = require('../../functions/formatDate')

const configWa = require('./configWa')

const { getNotifLeader } = require('./countermeasure')

module.exports = {
    getTemporaryAction: async() => {
        let qGetTempAct = `select th.fdate, th.fline, tmc.fmc_name, tmc.line_id,th.fchanges_item,th.fnote, th.fpic, th.fstatus from tb_henkaten th
        JOIN tb_mc tmc
            ON th.fmc = tmc.fmc_name
    WHERE fstatus = 0`
        let leaderList = await getNotifLeader()
        let temporaryAction = await cmdMultipleQuery(qGetTempAct)
            .then((result) => {
                // console.log(result)
                return result
            }).catch((err) => {
                // console.error(err)
                return err
            });
        let groupedData = temporaryAction.reduce(function(result, currentValue) {
            (result[currentValue.fline] = result[currentValue.fline] || []).push(currentValue);
            return result;
        }, {});
        let headerMsg = `*SMART TEMPORARY ACTION REMINDER*\n\n`
        for (const key in groupedData) {
            let contentInfo = `*Line: ${key}*\n`
            let tempActionData = groupedData[key].map(function(temp, i) { return `*(${i + 1})* \n*machine: ${temp.fmc_name}*\n*item temporary:* ${temp.fchanges_item}\n*Next Action:* ${temp.fnote}\n*PIC:* ${temp.fpic}\n\n` }).join("");
            let footerMsg = `Silahkan bisa di update untuk list nya click link dibawah\nhttps://smartandonsys.web.app/henkaten`
            let msg = headerMsg + contentInfo + tempActionData + footerMsg

            let findLeader = leaderList.filter(leader => {
                return leader.fline.toLowerCase() === key.toLowerCase()
            })
            console.log(findLeader);
            findLeader.forEach(leader => {
                console.log(msg);
                console.log(leader);
                configWa(msg, leader.fwa_no, 'TEMPORARY ACTION')
            })
        }
    }
}