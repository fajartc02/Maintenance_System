const credentials = {
    connectionLimit: 20, // default = 10
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.NAME_DB,
    timezone: 'utc'
};


module.exports = credentials