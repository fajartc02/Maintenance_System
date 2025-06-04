const cmdMultipleQuery = require('../config/MultipleQueryConnection');

function gettingErrror(res, err) {
    res.status(200).json({
        message: 'Error',
        err: err.message
    })
}

function formatDate(date) {
    var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
}

module.exports = {
    getAllCtMachines: (req, res) => {
        // Temp
        let q;
        if (req.query.searchMc) {
            if (req.query.searchMc.includes(',')) {
                let arrSearchMc = req.query.searchMc.split(',');
                console.log(arrSearchMc);
                q = `SELECT * FROM tb_cycletime_mc_log
                    WHERE DATE(fupdate) > DATE('${formatDate(req.query.startDate)}') AND DATE(fupdate) < DATE('${formatDate(req.query.endDate)}') AND (`
                let strMcTemp = '';
                for (let i = 0; i < arrSearchMc.length; i++) {
                    const element = arrSearchMc[i];
                    strMcTemp = `fMachine = '${element}'`
                    if (i < arrSearchMc.length - 1) {
                        strMcTemp += ' OR '
                    }
                    q += `${strMcTemp}`
                    strMcTemp = ''
                }
                q += `) ORDER BY fupdate DESC`
                console.log(q);
            } else {
                let onlyOneMc = []
                onlyOneMc.push(req.query.searchMc)
                q = `SELECT * FROM tb_cycletime_mc_log
                    WHERE DATE(fupdate) > DATE('${formatDate(req.query.startDate)}') AND DATE(fupdate) < DATE('${formatDate(req.query.endDate)}') AND (`
                let strMcTemp = '';
                for (let i = 0; i < onlyOneMc.length; i++) {
                    const element = onlyOneMc[i];
                    strMcTemp = `fMachine = '${element}'`
                    if (i < onlyOneMc.length - 1) {
                        strMcTemp += ' OR '
                    }
                    q += `${strMcTemp}`
                    strMcTemp = ''
                }
                q += `) ORDER BY fupdate DESC LIMIT`
                console.log(q);
            }
            // console.log(req.query.searchMc);
        } else {
            // q = `SELECT * FROM tb_cycletime_mc_log 
            // WHERE DATE(fupdate) = DATE('2021-06-18') AND
            // (fMachine = 'IMSP-0011'
            //     OR fMachine = 'IMSP-0012'
            //     OR fMachine = 'IMSP-0013'
            //     OR fMachine = 'IMSP-0014'
            //     OR fMachine = 'IMSP-0015'
            // ) ORDER BY fupdate DESC`;
        }
        cmdMultipleQuery(q)
            .then((result) => {
                // console.log(result)
                res.status(200).json({
                    message: 'Success to get ct machines',
                    data: result
                })
            }).catch((err) => {
                gettingErrror(res, err)
            });
    },
    getCtMcDashboard: (req, res) => {
        let mcCellRoughAB = [
            "IMSP-0001",
            "IMSP-0002",
            "IMSP-0003",
            "IMSP-0004",
            "IMSP-0005",
            "IMSP-0006",
            "IMSP-0007",
            "IMSP-0008",
            "IMSP-0009",
            "IMSP-0010",
            "IMSP-0011",
            "IMSP-0012",
            "IMSP-0013",
            "IMSP-0014",
            "IMSP-0015",
            "IMSP-0016",
            "IMSP-0017",
            "IMSP-0018",
            "IMSP-0019",
            "IMSP-0020",
        ]
        let mcCellRoughCD = [
            "IMSP-0027",
            "IMSP-0028",
            "IMSP-0029",
            "IMSP-0030",
            "IMSP-0031",
            "IMSP-0032",
            "IMSP-0033",
            "IMSP-0034",
            "IMSP-0035",
            "IMSP-0036",
            "IMSP-0037",
            "IMSP-0038",
            "IMSP-0039",
            "IMSP-0040",
            "IMSP-0041",
            "IMSP-0042",
            "IMSP-0043",
            "IMSP-0044",
            "IMSP-0045",
            "IMSP-0046",
        ]
        let mcCellFinA = [
            "IMSP-0021",
            "IMSP-0022",
            "IMSP-0023",
            "IMSP-0024",
            "IMSP-0025",
            "IMSP-0026",
        ]
        let mcCellFinB = [
            "IMSP-0047",
            "IMSP-0048",
            "IMSP-0049",
            "IMSP-0050",
            "IMSP-0051",
            "IMSP-0052",
        ]
        let searchCell;
        if (req.query.machinesCell == 'AB') {
            searchCell = mcCellRoughAB
        } else if (req.query.machinesCell == 'CD') {
            searchCell = mcCellRoughCD
        } else if (req.query.machinesCell == 'FA') {
            searchCell = mcCellFinA
        } else if (req.query.machinesCell == 'FB') {
            searchCell = mcCellFinB
        }
        let containerQuery = []
        for (let i = 0; i < searchCell.length; i++) {
            let q = `SELECT * FROM tb_cycletime_mc_log
                        WHERE DATE(fupdate) > DATE('${formatDate(req.query.startDate)}') AND 
                        DATE(fupdate) < DATE('${formatDate(req.query.endDate)}')`
            const mc = searchCell[i];
            q += ` AND fMachine = '${mc}' ORDER BY fupdate DESC LIMIT 1`
            containerQuery.push(q)
            q = ''
        }
        console.log(containerQuery);
        cmdMultipleQuery(containerQuery.join(';'))
            .then((result) => {
                console.log('THIS CELL MACHINE');
                // console.log(result);
                let mapResult = result.map((item, i) => {
                    if (item.length == 1) {
                        return item[0]
                    } else {
                        return {
                            fid: 1,
                            fMachine: searchCell[i],
                            fparamName: `CycleTime${i + 1}`,
                            fcycleTime: `${9}`,
                            fupdate: new Date()
                        }
                    }
                })
                console.log(mapResult);
                res.status(200).json({
                    message: 'Success to get ct cell',
                    data: mapResult
                })
            }).catch((err) => {
                console.log(err)
            });
    },
    getOneCtMachine: (req, res) => {
        let q = `SELECT * FROM tb_cycletime_mc_log
                    WHERE DATE(fupdate) > DATE('${formatDate(req.query.startDate)}') AND 
                    DATE(fupdate) < DATE('${formatDate(req.query.endDate)}') AND 
                    fMachine = '${req.query.machine}' ORDER BY fupdate DESC LIMIT 100`;
        console.log(q);
        cmdMultipleQuery(q)
            .then((result) => {
                let mapResult = [];
                if (result.length > 0) {
                    mapResult = result.map(ct => {
                        // ct.fcycleTime = Number(ct.fcycleTime) / 10
                        return ct
                    })
                } else {
                    for (let i = 0; i < 100; i++) {
                        mapResult.push({
                            fid: 450026,
                            fMachine: 'IMSP-0023',
                            fparamName: 'CycleTime23',
                            fcycleTime: 187,
                            fupdate: "2021-07-10T13:43:08.000Z"
                        })
                    }
                }
                res.status(200).json({
                    message: 'Success to get one ct machine',
                    data: mapResult
                })
            }).catch((err) => {
                gettingErrror(res, err)
            });

    }
}