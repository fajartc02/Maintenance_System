const cmdMultipleQuery = require('../config/MultipleQueryConnection');

module.exports = {
    getAllMtMember: (req, res) => {
        let q = `SELECT * FROM tb_mt_member`
        cmdMultipleQuery(q)
            .then((result) => {
                res.status(200).json({
                    message: 'Success to get mt member',
                    data: result
                })
            }).catch((err) => {
                res.status(203).json({
                    msg: 'Err to get mt member',
                    err: err.message
                })
            });
    },
    signin: (req, res) => {
        let q = `SELECT * FROM tb_mt_member WHERE fnoreg='${req.query.noreg}' AND fwa_no LIKE '%${req.query.wa}%' AND approval = 1;`

        cmdMultipleQuery(q)
            .then((result) => {
                res.status(200).json({
                    message: 'Success to get data signin',
                    data: result[0]
                })
            }).catch((err) => {
                res.status(500).json({
                    msg: 'Err to get data signin',
                    err: err.message
                })
            });
    },
    signup: (req, res) => {
        let queryCheck = `SELECT fnoreg FROM tb_mt_member WHERE fnoreg = '${req.body.fnoreg}'`
        let queryInsert = `INSERT INTO tb_mt_member
            (fname, fnoreg, fshift, frole, fwa_no)
                VALUES
            ('${req.body.fname}', '${req.body.fnoreg}', '${req.body.fshift}', 'TM', '${req.body.fpassword}')`
        cmdMultipleQuery(queryCheck)
            .then((isUser) => {
                console.log(isUser);
                if (isUser.length == 0) {
                    cmdMultipleQuery(queryInsert)
                        .then((result) => {
                            res.status(201).json({
                                message: 'Success to register',
                                data: result
                            })
                        }).catch((err) => {
                            res.status(500).json({
                                msg: 'Err to register',
                                err: err.message
                            })
                        });
                } else {
                    res.status(202).json({
                        message: 'Anda sudah terdaftar',
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    msg: 'Err to register',
                    err: err.message
                })
            })
    },
    getOnemember: (req, res) => {
        let arrLine = [{
                fline: 'CAM SHAFT',
                query: 'CAM'
            },
            {
                fline: 'CRANK SHAFT',
                query: 'CR'
            },
            {
                fline: 'CYLINDER HEAD',
                query: 'CH'
            },
            {
                fline: 'CYLINDER BLOCK',
                query: 'CB'
            },
            {
                fline: 'ASSY LINE',
                query: 'ASSY'
            },
            {
                fline: 'LPDC',
                query: 'LP'
            },
            {
                fline: 'HPDC',
                query: 'DC'
            }
        ]
        let searchLine = arrLine.filter(line => {
            if (line.fline === req.query.targetLine.toUpperCase()) {
                return line.query
            }
        })
        let selectedLine = searchLine[0].query
        let qGh = `SELECT fname, fshift, frole FROM 
            tb_mt_member
            WHERE
                fline LIKE '%${selectedLine}%' AND
                fshift LIKE '%${req.query.targetShift}%' AND
                frole = 'GH'`
        let qLh = `SELECT fname, fshift, frole FROM 
            tb_mt_member
            WHERE
                fline LIKE '%${selectedLine}%' AND
                fshift LIKE '%${req.query.targetShift}%' AND
                frole = 'LH'`
        let qSh = `SELECT fname, fshift, frole FROM 
            tb_mt_member
            WHERE
                fline LIKE '%${selectedLine}%' AND
                fshift LIKE '%${req.query.targetShift}%' AND
                frole = 'SH'`
        cmdMultipleQuery(qGh)
            .then((result) => {
                res.status(200).json({
                    message: 'Success to get data member',
                    data: result
                })
            }).catch((err) => {
                res.status(500).json({
                    msg: 'Err to get data member',
                    err: err.message
                })
            });
    }
}