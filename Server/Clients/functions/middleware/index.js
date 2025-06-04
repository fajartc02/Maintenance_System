const pool = require('../config/MysqlConnection');


module.exports = {
    getLinesMiddle: (req, res, next) => {
        pool.getConnection(function(err, conn) {
            var q = `select * from tb_line`;
            pool.query(q, function(err, results) {
                if (err) throw err;
                res.locals.lines = results
                conn.release();
                next()
            });
        })
    },
}