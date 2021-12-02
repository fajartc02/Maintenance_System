const mysql = require('mysql2')

var pool = mysql.createPool({
    // connectionLimit: 100, // default = 10
    host: process.env.HOST_DB_NEW,
    user: process.env.USER_DB_NEW,
    port: 3306,
    password: process.env.PASSWORD_DB_NEW,
    database: process.env.NAME_DB_NEW,
    multipleStatements: true,
    queueLimit: 0,
    waitForConnections: true,
    connectionLimit: 10,
    timezone: 'utc',
    connectTimeout: 60000
});

function cmdMultipleQuery(sql) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                console.log(err);
                reject(err);
            }
            connection.query(sql, function(err, result) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(result);
                connection.destroy()
            });
            pool.releaseConnection(connection);
        });
    });
}


module.exports = cmdMultipleQuery