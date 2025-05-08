const db = require('./centralQuery')

function insertDataTable(table_name, cols, values) {
    return new Promise((resolve, reject) => {
        let q = `INSERT INTO ${table_name}
            (${cols.join(',')})
        VALUES (${values.join(',')})`
        db(q)
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            });
    })
}


module.exports = insertDataTable