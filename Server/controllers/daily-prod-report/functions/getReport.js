const { cmdMultipleQuery } = require('./index')

async function getReport(id_m_shift = '', id_m_group = '', id_m_line = 1, date = 'ORDER BY date_report DESC LIMIT 1') {
    // return new Promise((resolve, reject) => {
    let q = `SELECT * from v_report WHERE id_m_line = ${id_m_line} ${date}`
    console.log(q);
    let report = null
    await cmdMultipleQuery(q)
        .then((result) => {
            // console.log(result);
            // resolve(result)
            report = result[0]
        }).catch((err) => {
            // reject(err)
            // return err
            report = err
        });
    return report
        // })
}

module.exports = getReport