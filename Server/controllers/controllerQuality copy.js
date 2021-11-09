const cmdMultipleQuery = require('../config/MultipleQueryConnection')

module.exports = {
    addDataQuality: (req, res) => {
        let count = 0
        let q = `INSERT INTO tb_quality (fdesc, fmc_name, fline, filustration, fdate, foperator, fshift, fwork_no, isDay) VALUES (`
        for(let key in req.body) {
            const element = req.body[key]
            if(key == 'isDay') {
                q += `${element}`
            } else {
                q += `'${element}'` 
            }
            if(count < 8) {
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
    qualityData: (req, res) => {
        let q = `SELECT * FROM tb_quality WHERE MONTH(fdate) = MONTH(NOW())`
        let qOk = `SELECT DATE(fdate) fdate, fline, COUNT(*) totalCount
        FROM tb_quality
        GROUP BY DATE(fdate)`
        cmdMultipleQuery(`${q};${qOk}`)
        .then(result => {
            let containerCount = []
            let endDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0 ).getDate()
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
            console.log(containerResult);
            console.log(result[1]);
            for (let i = 0; i < result[1].length; i++) {
                const element = result[1][i];
                let getDate = element.fdate.getDate()
                    containerCount[getDate-1] = element.totalCount
            }
            result[1] = containerCount
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
    groupDefect:(req, res) => {
        let q = `SELECT fdesc, COUNT(*) totalCount
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
        let q = `SELECT fmc_name, COUNT(*) totalCount
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
    todaysDefect: (req, res) => {
        let q = `SELECT * FROM tb_quality WHERE DATE(fdate) = DATE(NOW()) LIMIT 8`
        let qAll = `SELECT * FROM tb_quality WHERE MONTH(fdate) = MONTH(NOW())`
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
    }
}