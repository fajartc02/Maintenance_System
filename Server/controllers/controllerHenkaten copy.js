const pool = require('../config/MysqlConnection');

module.exports = {
    postHenkaten: (req, res) => {
        let qNewHenkaten = `INSERT INTO tb_henkaten (fdate, fline, fmc, fproblem, fchanges_item, fpart_type, fpic, fwork_no, fnote) VALUES `
        let idx = 0;
        qNewHenkaten += `(`
        Object.size = function(obj) {
            var size = 0,
                key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++;
            }
            return size;
        };
        let size = Object.size(req.body)
        for (let key in req.body) {
            idx++
            if (key == 'fdate') {
                qNewHenkaten += `TIMESTAMP('${req.body[key]}')`
            } else {
                // qNewHenkaten += `${key}='${req.body[key]}'`
                qNewHenkaten += `'${req.body[key]}'`
            }
            qNewHenkaten += ``
            if (idx == size) {} else {
                qNewHenkaten += ','
            }
        }
        qNewHenkaten += `)`
        console.log(qNewHenkaten);
        pool.getConnection(async function(err, conn) {
            if (err) {
                res.status(203).json({
                    message: 'Failed to post henkaten',
                    err: err.message
                })
            }
            conn.query(qNewHenkaten, function(err, results) {
                if (err) {
                    res.status(203).json({
                        message: 'Failed to post henkaten',
                        err: err.message
                    })
                }

                res.status(201).json({
                    message: 'Success to post henkaten',
                    data: results
                })
                conn.release()
            })
        })
    },
    getHenkaten: (req, res) => {
        let qGetHenkaten = `SELECT * FROM tb_henkaten`
        if (req.query.startDate || req.query.endDate || req.query.fline || req.query.fmc) {
            qGetHenkaten += ` WHERE`

            if (req.query.fine) {
                qGetHenkaten += ` fline = '${req.query.fline}'`
            }
            if (req.query.startDate || req.query.endDate) {
                qGetHenkaten += ` date(fdate) >= date('${req.query.startDate}') and date(fdate) <= date('${req.query.endDate}')`
            }
            if (req.query.fmc) {
                qGetHenkaten += ` fmc = '${req.query.fmc}'`
            }
        }
        pool.getConnection(async function(err, conn) {
            if (err) {
                res.status(203).json({
                    message: 'Failed to get henkaten',
                    err: err.message
                })
            }
            conn.query(qGetHenkaten, function(err, results) {
                if (err) {
                    res.status(203).json({
                        message: 'Failed to get henkaten',
                        err: err.message
                    })
                }

                res.status(200).json({
                    message: 'Success to post henkaten',
                    data: results
                })
                conn.release()
            })
        })

    }
}