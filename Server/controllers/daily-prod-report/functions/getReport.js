const { cmdMultipleQuery } = require('./index')

async function getReport(search) {
    // return new Promise((resolve, reject) => {
    let  date = 'ORDER BY date_report DESC LIMIT 1'
    let q = `SELECT * from v_report ${search} ${date}`
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