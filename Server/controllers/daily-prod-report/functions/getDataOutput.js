const { cmdMultipleQuery } = require('./index');
const formatDate = require('../../../functions/formatDate')

async function getDataOutput(id_report, selected_date = null) {
    // return new Promise((resolve, reject) => {
    let filterQuery = ``

    console.log(formatDate.getTommorow(new Date()));
    console.log(formatDate.getYesterday(new Date()));
    let q = `SELECT * 
            FROM
                u5364194_smartand_tmmin3_qmms.v_report_output
            WHERE id_tr_report = ${id_report}`
    console.log(q);
    let outputData = null
    await cmdMultipleQuery(q)
        .then((result) => {
            outputData = result
            return result
        }).catch((err) => {
            outputData = err
            return err
        });
    return outputData
}

module.exports = getDataOutput