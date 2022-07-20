const mysql = require('mysql')

var pool = mysql.createPool({
    // connectionLimit: 100, // default = 10
    connectTimeout: 60 * 60 * 1000,
    acquireTimeout: 60 * 60 * 1000,
    timeout: 60 * 60 * 1000,
    host: process.env.HOST_DB_NEW,
    user: process.env.USER_DB_NEW,
    port: 3306,
    password: process.env.PASSWORD_DB_NEW,
    database: process.env.NAME_DB_NEW,
    timezone: 'utc',
    waitForConnections: true,
    queueLimit: 0,
    connectionLimit: 10,
    acquireTimeout: 60000
});

function cmdQuery(sql) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject(err);
            }
            console.log(err);
            connection.query(sql, function(err, result) {

                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(result);
                connection.release();
            });
        });
    });
}


module.exports = cmdQuery