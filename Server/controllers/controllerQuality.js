const cmdMultipleQuery = require('../config/MultipleQueryConnection')

module.exports = {
    addDataQuality: (req, res) => {
        let count = 0
        let q = `INSERT INTO tb_quality (fdesc, fmc_name, fline, filustration, fdate, foperator, fshift, fwork_no, totalDefect, isDay) VALUES (`
        for(let key in req.body) {
            const element = req.body[key]
            if(key == 'isDay' || key == 'totalDefect') {
                q += `${element}`
            } else {
                q += `'${element}'` 
            }
            if(count < 9) {
                q += ','
            }
            count++
        }
        q += `)`
        console.log(q);
        cmdMultipleQuery(q)
        .then(result => {
            res.status(201).json({
                message: 'ok',
                data: result
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'err',
                err
            })
        })
    },
    qualityData: async (req, res) => {
        let q = `SELECT * FROM tb_quality WHERE MONTH(fdate) = MONTH(${req.query.date})`
        let endDate = new Date(req.query.date.split('-')[0], req.query.date.split('-')[1][0] == '0' ? +req.query.date.split('-')[1][1] : +req.query.date.split('-')[1], 0 ).getDate()

        let containerCount = []
        let containerResult = [
            {
                name: 'LPDC',
                data: []
            },
            {
                name: 'HPDC',
                data: []
            },
            {
                name: 'Cylinder Block',
                data: []
            },
            {
                name: 'Cylinder Head',
                data: []
            },
            {
                name: 'Crank shaft',
                data: []
            },
            {
                name: 'Cam Shaft',
                data: []
            },
            {
                name: 'ASSY LINE',
                data: []
            },
        ]
            for (let j = 0; j < containerResult.length; j++) {
                const element = containerResult[j];
                for (let i = 0; i < endDate; i++) {
                    containerCount.push(0)
                }
                element.data = containerCount
                containerCount = []
            }
        let containerRes = []
        for (let i = 0; i < containerResult.length; i++) {
            const line = containerResult[i].name;
            console.log(new Date());
            let qOk = `SELECT DATE(fdate) fdate, fline, SUM(totalDefect) totalCount
                FROM tb_quality WHERE fline LIKE '%${line}%' AND MONTH(fdate) = MONTH('${req.query.fdate}')
                GROUP BY DATE(fdate)`
                await cmdMultipleQuery(qOk)
                .then(result => {
                    console.log(result);
                    containerRes.push(result)
                })
                .catch(err => {
                    res.status(500).json({
                        message: 'err',
                        err
                    })
                    console.log(err);
                })
        }
        for (let i = 0; i < containerRes.length; i++) {
            const element = containerRes[i];
            if(element.length > 0) {
                let findIndex = containerResult.findIndex(x => x.name == element[0].fline)
                for (let j = 0; j < element.length; j++) {
                    const item = element[j];
                    let getDate = item.fdate.getDate()
                    containerResult[findIndex].data[getDate-1] = item.totalCount
                    console.log(containerResult[findIndex].data[getDate-1]);
                }
            }
        }
        res.status(200).json({
            message: 'ok',
            data: containerResult
        })
    },
    groupDefect:(req, res) => {
        let q = `SELECT fdesc, SUM(totalDefect) totalCount
        FROM tb_quality
        GROUP BY fdesc ORDER BY totalCount DESC LIMIT 5`
        cmdMultipleQuery(q)
        .then(result => {
            res.status(200).json({
                message: 'ok',
                data: result
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'err',
                err
            })
        })
    },
    groupWorstMachine: (req, res) => {
        let q = `SELECT fmc_name, SUM(totalDefect) totalCount
        FROM tb_quality
        GROUP BY fmc_name ORDER BY totalCount DESC LIMIT 5`
        cmdMultipleQuery(q)
        .then(result => {
            res.status(200).json({
                message: 'ok',
                data: result
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'err',
                err
            })
        })
    },
    allDefectData: (req, res) => {
        let q = `SELECT * FROM tb_quality 
            WHERE 
                DATE(fdate) >= DATE('${req.query.startDate}') AND
                DATE(fdate) <= DATE('${req.query.finishDate}')`
        for (const key in req.query) {
            if (Object.hasOwnProperty.call(req.query, key)) {
                const element = req.query[key];
                console.log(element);
                if(key != 'startDate' && key != 'finishDate') {
                    q += ` AND ${key} LIKE '%${element}%'`
                }
            }
        }
        cmdMultipleQuery(`${q}`)
        .then(result => {
            res.status(200).json({
                message: 'ok',
                data: result
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'err',
                err
            })
        })
    },
    getOneDefectData: (req, res) => {
        let q = `SELECT * FROM tb_quality WHERE fid = ${req.query.v_}`
        cmdMultipleQuery(q)
            .then(result => {
                res.status(200).json({
                    message: 'ok',
                    data: result
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: 'err',
                    err
                })
            })
    },
    editDefectData: (req, res) => {
        let inputData = req.body;
        let containerInput = []
        for (const key in inputData) {
            const element = inputData[key]
            if(element) {
                containerInput.push(`${key} = '${element}'`)
            }
        }
        let q = `UPDATE tb_quality SET ${containerInput.join(',')} WHERE fid = ${req.params.v_}`
        console.log(q);
        cmdMultipleQuery(q)
            .then(result => {
                res.status(201).json({
                    message: 'OK',
                    data: result
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: 'err',
                    err
                })
            })
    },
    removeDefectData: (req, res) => {
        let q = `DELETE FROM tb_quality WHERE fid = ${req.params.v_}`
        cmdMultipleQuery(q)
            .then((result) => {
                res.status(201).json({
                    message: 'Succcess to delete',
                    data:result
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: 'err',
                    err
                })
            })
    }
}