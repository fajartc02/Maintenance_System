const cmdQuery = require('../config/MultipleQueryConnection');
// const pool = require('../config/MysqlConnection');

module.exports = {
    postHenkaten: (req, res) => {
        let q = `SELECT fid FROM tb_henkaten WHERE fchanges_item = '${req.query.keywordTempAction}' AND fstatus = 0`
        console.log(q);
        cmdQuery(q)
            .then((result) => {
                if (result.length == 0) {
                    let qNewHenkaten = `INSERT INTO tb_henkaten (fdate, fline, fmc, fproblem, fchanges_item, fpart_type, fpic, fwork_no, fnote, fstatus) VALUES `
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
                    let size = Object.size(req.body);
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
                    qNewHenkaten += `)`;
                    cmdQuery(qNewHenkaten)
                        .then((results) => {
                            res.status(201).json({
                                message: 'Success to post henkaten',
                                data: results
                            })
                        }).catch((err) => {
                            res.status(203).json({
                                message: 'Failed to post henkaten',
                                err: err.message
                            })
                        });
                } else {
                    res.status(203).json({
                        message: 'Duplicate item'
                    })
                }
            }).catch((err) => {
                res.status(500).json({
                    message: 'Error temporary action',
                    err: err.message
                })
            });
    },
    getHenkaten: (req, res) => {
        let qGetHenkaten = `SELECT * FROM tb_henkaten`
        if (req.query.startDate || req.query.endDate || req.query.fline || req.query.fmc) {
            qGetHenkaten += ` WHERE`
            if (req.query.startDate || req.query.endDate) {
                qGetHenkaten += ` date(fdate) >= date('${req.query.startDate}') and date(fdate) <= date('${req.query.endDate}')`
            }
            if (req.query.fline) {
                qGetHenkaten += ` AND fline = '${req.query.fline}'`
            }
            if (req.query.fmc) {
                qGetHenkaten += ` AND fmc = '${req.query.fmc}'`
            }
        }
        qGetHenkaten += `ORDER BY fdate DESC`
        cmdQuery(qGetHenkaten)
            .then((results) => {
                res.status(200).json({
                    message: 'Success to get henkaten',
                    data: results
                })
            }).catch((err) => {
                res.status(203).json({
                    message: 'Failed to get henkaten',
                    err: err.message
                })
            });
    },
    deleteHenkaten: (req, res) => {
        let q = `DELETE FROM tb_henkaten WHERE fid = ${req.params.v_}`;
        cmdQuery(q)
            .then((results) => {
                res.status(201).json({
                    message: 'Success to delete henkaten',
                    data: results
                })
            }).catch((err) => {
                res.status(203).json({
                    message: 'Failed to delete henkaten',
                    err: err.message
                })
            });
    },
    editHenkaten: (req, res) => {
        let q = `UPDATE tb_henkaten SET`
        console.log(req.body);
        var count = 0
        for (let key in req.body) {
            console.log(key);

            count++
            if (count == 10) {
                q += ` ${key} = ${req.body[key]}`
            } else {
                q += ` ${key} = '${req.body[key]}'`
            }
            if (count == 10) {
                q += ''
            } else {
                q += ','
            }
        }
        q += ` WHERE fid = ${req.params.v_}`
        console.log(q);
        console.log(req.params);
        cmdQuery(q)
            .then((results) => {
                res.status(201).json({
                    message: 'Success to Edit Henkaten',
                    data: results
                })
            }).catch((err) => {
                res.status(203).json({
                    message: 'Failed to Edit henkaten',
                    err: err.message
                })
            });

    }
}