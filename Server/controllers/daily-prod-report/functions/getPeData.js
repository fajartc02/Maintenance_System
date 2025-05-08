function getPeData(id_tr_time_output_report) {
    return new Promise((resolve, reject) => {
        const { cmdMultipleQuery } = require('./index')
        let q = `SELECT * FROM tr_time_pe_report WHERE id_tr_time_output_report = ${id_tr_time_output_report}`
        let res = null
        console.log(q);
        cmdMultipleQuery(q)
            .then((result) => {
                resolve(result)
                    // res = result
            }).catch((err) => {
                reject(err)
                    // res = err
            });
    })
}


module.exports = getPeData