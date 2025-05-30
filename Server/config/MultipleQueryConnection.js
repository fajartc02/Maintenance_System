const conf = {
    // connectionLimit: 100, // default = 10
    host: process.env.HOST_DB_NEW,
    user: process.env.USER_DB_NEW,
    port: process.env.DB_PORT,
    password: process.env.PASSWORD_DB_NEW,
    database: process.env.NAME_DB_NEW,
    multipleStatements: true,
    queueLimit: 0,
    waitForConnections: true,
    timezone: "+07:00",
    connectTimeout: 60000,
};

console.log('database config', conf);

const mysql = require("mysql2");
const {createPool} = require("mysql2/promise")
const pool = createPool(conf);
//await promisePool.end();


async function cmdMultipleQuery(sql) {
    require("dotenv").config();
    //const promisePool = pool.promise();
    //const [rows, fields] = await promisePool.query(sql);
    const rows = await pool.query(sql);
    // console.log(rows);
    return rows[0];
    // return new Promise(async(resolve, reject) => {
    //     await pool.getConnection(function(err, connection) {
    //         if (err) {
    //             console.log(err);
    //             connection.destroy();
    //             reject(err);
    //         }
    //         connection.query(sql, function(err, result) {
    //             if (err) {
    //                 console.log(err);
    //                 reject(err);
    //             }
    //             connection.destroy();
    //             resolve(result);
    //             // connection.destroy()
    //             // connection.release()
    //         });
    //         // pool.releaseConnection(connection);
    //     });
    //     // await pool.end();
    // });
}

module.exports = cmdMultipleQuery;
