const cmdMultipleQuery = require('../config/MultipleQueryConnection')

function insertData(table_name, colsName, vals) {
    console.log(table_name, colsName, vals);
    let q = `INSERT INTO ${table_name} 
        (${colsName.join(',')}) 
            VALUES
        (${vals.join(',')})`
        console.log(q);
    return new Promise(async (resolve, reject) => {
        await cmdMultipleQuery(q)
            .then(result => {
                resolve(result)
            })
            .catch(err => {
                reject(err)
            })
    })
}

function bulkInsertData(table_name, colsName, vals) {
    let q = `INSERT INTO ${table_name} 
        (${colsName.join(',')}) 
            VALUES
        ${vals.join(',')}`
        console.log(q);
        return new Promise(async (resolve, reject) => {
            await cmdMultipleQuery(q)
                .then(result => {
                    resolve(result)
                })
                .catch(err => {
                    reject(err)
                })
        })
}

function getData(table_name, someCols = false, filterQuery) {
    let q = `SELECT`
    let containerCols = []
    if(someCols) {
        someCols.forEach(item => {
            containerCols.push(item)
        })
        q += ` ${containerCols.join(',')}`
    } else {
        q += ` *`
    }
    q += ` FROM ${table_name}`
    console.log(filterQuery);
    if(filterQuery) {
        q += ` ${filterQuery}`
    }
    console.log(q);
    return new Promise(async (resolve, reject) => {
        await cmdMultipleQuery(q)
            .then(result => {
                resolve(result)
            })
            .catch(err => {
                reject(err)
            })
    })
}

module.exports = {
    insertData,
    getData,
    bulkInsertData
}