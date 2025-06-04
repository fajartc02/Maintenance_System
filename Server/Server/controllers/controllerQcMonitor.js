const cmdMultipleQuery = require('../config/MultipleQueryConnection')

module.exports = {
    addQcData: (req, res) => {
        let qInsert = `INSERT INTO tb_qc_log
            (
                fdate,
                fshift,
                fno_work,
                fcell,
                fdefect_area,
                frelated_tv_core,
                fdie_core_no,
                frelated_ikdm,
                fdie_ikdm_no,
                fvalue_in,
                fvalue_ex,
                fchecker
            ) VALUES
            (
                '${req.body.fdate}',
                '${req.body.fshift}',
                '${req.body.fno_work}',
                '${req.body.fcell}',
                '${req.body.fdefect_area}',
                '${req.body.frelated_tv_core}',
                '${req.body.fdie_core_no}',
                '${req.body.frelated_ikdm}',
                '${req.body.fdie_ikdm_no}',
                ${req.body.fvalue_in},
                ${req.body.fvalue_ex},
                '${req.body.fchecker}'
            )`
        cmdMultipleQuery(qInsert)
            .then((result) => {
                res.status(201).json({
                    message: 'Success to add qc data',
                    data: result
                })
            }).catch((err) => {
                res.status(500).json({
                    message: 'Error to add qc data',
                    err: err.message
                })
            });
    },
    getAllQcData: (req, res) => {
        // let qGet = `SELECT * FROM tb_qc_log WHERE DATE(fupdate) > DATE('${req.query.startDate}') AND DATE(fupdate) > DATE('${req.query.endDate}')`
        let containerQuery = []
        let objSearch = JSON.parse(req.query.selectParams)
        let arrSearch = objSearch.value.split(',')

        for (let i = 0; i < arrSearch.length; i++) {
            let qGet = `SELECT * FROM tb_qc_log WHERE MONTH(fdate) = MONTH(NOW())`
            const element = arrSearch[i];
            if (req.query.selectParams) {
                qGet += ` AND ${objSearch.key} = '${element}'`
            }
            containerQuery.push(qGet)
        }
        console.log(arrSearch);
        // console.log(qGet);
        console.log(containerQuery.join(';'));
        cmdMultipleQuery(containerQuery.join(';'))
            .then((result) => {
                console.log(result);
                res.status(200).json({
                    message: 'Success to get qc data',
                    data: result
                })
            }).catch((err) => {
                res.status(500).json({
                    message: 'Error to get qc data',
                    err: err.message
                })
            });
    }
}