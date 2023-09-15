const cmdQuery = require('../config/MysqlConnection');
const cmdQueryMultiple = require('../config/MultipleQueryConnection');
const pool = require('../config/MysqlConnection');

function gettingError(res, err) {
    res.status(203).json({
        message: 'Error',
        err: err
    })
}

module.exports = {
    addNewMachine: async(req, res) => {
        let qAddNewMachine = `INSERT INTO tb_mc 
            (fmc_name, fline, fop_desc, fmaker) 
        VALUES
            ('${req.body.machine}', '${req.body.selectedLine}', '${req.body.process}', '${req.body.maker}');`
        await cmdQueryMultiple(qAddNewMachine)
            .then(async(results) => {
                let newMcId = results.insertId
                let q = `INSERT INTO tb_status(fid, fstatus) VALUES (${newMcId}, 0)`
                await cmdQuery(q)
                    .then(resu => {
                        res.status(201).json({
                            message: 'Success to add new Machine',
                            data: 'inserted'
                        })
                    })
                    .catch(erro => {
                        gettingError(res, erro)
                    })

            }).catch((err) => {
                gettingError(res, err)
            });
    },
    mapMachines: (req, res) => {
        let q = `SELECT * FROM tb_mc`
        if (req.query.fline) {
            q += ` WHERE fline LIKE '%${req.query.fline}%'`
        }
        cmdQuery(q)
            .then((result) => {
                res.status(200).json({
                    message: 'Success to get machines',
                    data: result
                })
            }).catch((err) => {
                gettingError(res, err)
            });
    }
}