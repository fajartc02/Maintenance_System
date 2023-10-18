const tableError2 = 'tb_error_log_2'
const tableMachine = 'tb_mc'
const ViewCurrentError2 = 'v_current_error_2'
const cmdMultipleQuery = require('../../config/MultipleQueryConnection');

function gettingError(res, err) {
    res.status(500).json({
        message: 'Error',
        err
    })
}

function gettingSuccess(res, status, data) {
    res.status(status).json({
        message: 'ok',
        data
    })
}

// workingTime = 16 * 20
/*
    PSEUDO CODE:
    IF (MTTR <= 2H AND (MTBF > 800H OR MTTR >= 400H)) THEN 
        RANK = 'A'
    ELSE IF (MTTR > 2H AND MTTR <= 3H) AND (MTBF > 800H OR MTTR >= 400) THEN
        RANK = 'B'
    ELSE IF ((MTTR < 3H AND MTTR >= 2H) AND (MTBF > 800H OR MTBF < 800H OR MTBF > 400H OR MTBF < 200H)) THEN
        RANK = 'C'
    ELSE IF ((MTTR > 3H AND MTTR >= 2H))
        RANK = 'D'
    ELSE 
        RANK = 'F'

    ======RUMUS MTBF======
    mtbfByMc = workingHour / totalProblem
    mtbfByLine = totalWHAllMcs / Jumlah Problem all mcs
    ======RUMUS MTTR======
    mttrByMc = totalTimeRepair / totalProblem
    mttrByLine = totalMTTRAllMcs / jumlahMcs
*/

module.exports = {
    getMtbf: (req, res) => {
        let { start_date, end_date } = req.query
        let containerLine = [{
                name: 'LPDC',
                totalMc: 0,
                sumRepair: 0,
                machines: [],
                countProblem: 0
            },
            {
                name: 'HPDC',
                totalMc: 0,
                sumRepair: 0,
                countProblem: 0
            },
            {
                name: 'crank shaft',
                totalMc: 0,
                sumRepair: 0,
                countProblem: 0
            },
            {
                name: 'cam shaft',
                totalMc: 0,
                sumRepair: 0,
                countProblem: 0
            },
            {
                name: 'cylinder block',
                totalMc: 0,
                sumRepair: 0,
                countProblem: 0
            },
            {
                name: 'cylinder head',
                totalMc: 0,
                sumRepair: 0,
                countProblem: 0
            },
            {
                name: 'assy line',
                totalMc: 0,
                sumRepair: 0,
                countProblem: 0
            }
        ]
        let containerQueryTotalMc = []
        let containerQuerySumProblemMc = []
        let containerQueryCountProblemMc = []
        let containerDurFetch = [30, 30, 30, 30, 30, 30, 5]
            // let qTotalProblem
            // CAST(expression AS TYPE);
        let queryTime = `
        AND fstart_time BETWEEN 
        '${start_date} 00:00:00' AND '${end_date} 23:59:59'`
        for (let i = 0; i < containerLine.length; i++) {
            const line = containerLine[i];
            let qTotalMc = `SELECT fline, count(fid) as totalMc FROM ${tableMachine} WHERE fline like '%${line.name}%'`
            let qSumProbMc = `SELECT fline, fmc_name, CAST(sum(fdur) AS INT) as totalRepair from ${ViewCurrentError2} 
            where 
                fdur >= ${containerDurFetch[i]} 
                AND fline like '%${line.name}%' 
                ${queryTime}
            GROUP BY fmc_name`
            let qCountProbMc = `SELECT fline, fmc_name, count(fid) as countTotalProblem from ${ViewCurrentError2} 
            where 
                fdur >= ${containerDurFetch[i]} 
                AND fline like '%${line.name}%' 
                ${queryTime}
            GROUP BY fmc_name`
            containerQueryTotalMc.push(qTotalMc)
            containerQuerySumProblemMc.push(qSumProbMc)
            containerQueryCountProblemMc.push(qCountProbMc)
        }
        // 0 - 6 (total mc)
        // 7 - 13 (sumProb / Mc)
        // 14 - 20 (count total problem / mc)
        cmdMultipleQuery(containerQueryTotalMc.join(';') + ';' + containerQuerySumProblemMc.join(';') + ';' + containerQueryCountProblemMc.join(';'))
            .then(async(result) => {
                let workingHour = 1020
                let machinesDataAll = await cmdMultipleQuery('SELECT * FROM tb_mc')
                    // result[0~6] => [{fline: LINE, totoalMc: 00}]
                    // result[7~13] => [{fline: LINE, fmc_name: MC, totalRepair: 00}]
                    // result[14~20] => [{ fline: LINE, fmc_name: MC, countTotalProblem: 00 }]
                let totalMcsLines = result.slice(0, 7)
                let totalTimeRepairMcs = result.slice(7, 14)
                let totalProblemMcs = result.slice(14, 21)
                let containerA = []
                let containerB = []
                let containerC = []
                let containerD = []
                let containerE = []
                let containerF = []
                let containerScatters = [{
                    name: 'Range A',
                    key: 'containerA',
                    data: []
                }, {
                    name: 'Range B',
                    key: 'containerB',
                    data: []
                }, {
                    name: 'Range C',
                    key: 'containerC',
                    data: []
                }, {
                    name: 'Range D',
                    key: 'containerD',
                    data: []
                }, {
                    name: 'Range E',
                    key: 'containerE',
                    data: []
                }, {
                    name: 'Range F',
                    key: 'containerF',
                    data: []
                }]
                let mapResult = totalMcsLines.map((arrLine, i) => {
                    let line = arrLine[0]
                    let separatorTimeRepairMcs = totalTimeRepairMcs[i]
                    let mapMttrMtbfMcs = separatorTimeRepairMcs.map((mc, j) => {

                        // mttrByMc = totalTimeRepair / totalProblem
                        let mttrByMc = mc.totalRepair / totalProblemMcs[i][j].countTotalProblem
                        mc.totalProblem = totalProblemMcs[i][j].countTotalProblem
                        mc.mttr = mttrByMc

                        // mtbfByMc = workingHour = workingHour = 20s hari kerja / totalProblem
                        mc.mtbf = workingHour / totalProblemMcs[i][j].countTotalProblem
                        console.log(totalProblemMcs[i][j].countTotalProblem);
                        console.log(mc.totalRepair);
                        console.log(mc);
                        return mc
                    })

                    // console.log(mapMttrMtbfMcs);
                    line.mcs = mapMttrMtbfMcs
                    let totalRepairLine = totalTimeRepairMcs[i].reduce((accumulator, currentValue) => {
                        return accumulator + currentValue.totalRepair
                    }, 0)
                    let totalProbLine = totalProblemMcs[i].reduce((accumulator, currentValue) => {
                        return accumulator + currentValue.countTotalProblem
                    }, 0)
                    let totalMcs = line.totalMc

                    // RUMUS 1
                    // mtbfByLine = totalWHAllMcs / Jumlah Problem all mcs
                    // let mtbfByLine = (workingHour * totalMcs) / (totalProbLine == 0 ? 1 : totalProbLine)
                    // mttrByLine = totalMTTRAllMcs / jumlahMcs
                    let totalMttrByLines = mapMttrMtbfMcs.reduce((accumulator, currentValue) => {
                        return accumulator + currentValue.mttr
                    }, 0)

                    let mttrByLine = totalMttrByLines / totalMcs


                    // RUMUS 2
                    // MTBF = totalMTBFAllMc / Jumlah mesin
                    let totalMtbfMcs = mapMttrMtbfMcs.reduce((accumulator, currentValue) => {
                        return accumulator + currentValue.mtbf
                    }, 0)

                    // console.log(totalMtbfMcs / totalMcs);
                    let mtbfByLine = (totalMtbfMcs + ((totalMcs - 10) * workingHour)) / totalMcs
                    line.totalRepair = totalRepairLine
                    line.totalProblem = totalProbLine
                    line.mttr = +mttrByLine.toFixed(1)
                    line.mtbf = +mtbfByLine.toFixed(0)

                    for (let idx = 0; idx < machinesDataAll.length; idx++) {
                        machinesDataAll[i].mtbf = 1300 - (i * 15)
                        machinesDataAll[i].mttr = 0
                        const mc = line.mcs[idx] ? line.mcs[idx] : machinesDataAll[i];

                        let mttr = mc.mttr || 0
                        let mtbf = mc.mtbf || 1300 - (i * 15)
                        console.log(mttr);
                        console.log(mtbf);
                        let typeMttr = 1
                        let typeMtbf = 1
                            // MTTR:
                            //     1 mttr <= 1
                            //     2 (mttr > 1 && mttr <= 2)
                            //     3 (mttr > 2 && mttr <= 3)
                            //     4 mttr > 3
                        if (mttr <= 1) typeMttr = 1
                        else if (mttr > 1 && mttr <= 2) typeMttr = 2
                        else if (mttr > 2 && mttr <= 3) typeMttr = 3
                        else if (mttr > 3) typeMttr = 4
                            // MTBF:
                            //     1 mtbf >= 850
                            //     2 (mtbf < 850 && mtbf >= 450)
                            //     3 (mtbf < 450 && mtbf >= 250)
                            //     4 mtbf < 250 
                        if (mtbf >= 850) typeMtbf = 1
                        else if (mtbf < 850 && mtbf >= 450) typeMtbf = 2
                        else if (mtbf < 450 && mtbf >= 250) typeMtbf = 3
                        else if (mtbf < 250) typeMtbf = 4

                        /*
                            RANGED A:
                                1 && 1 || 2 && 1 || 1 && 2
                            RANGED B:
                                1 && 3 || 2 && 2 || 3 && 1
                            RANGED C:
                                1 && 4 || 2 && 3 || 3 && 2 || 4 && 1
                            RANGED D:
                                2 && 4 || 3 && 3 || 4 && 2
                            RANGED E:
                                3 && 4 || 4 && 3
                            RANGED F:
                                4 && 4
                        */
                        mc.typeMttr = typeMttr
                        mc.typeMtbf = typeMtbf
                        let scatter = [mttr, mtbf]
                        let obj = {}
                        if ((typeMttr == 1 && typeMtbf == 1) || (typeMttr == 2 && typeMtbf == 1) || (typeMttr == 1 && typeMtbf == 2)) {
                            // RANGED A
                            containerA.push(mc)

                            let findObj = containerScatters.find(range => range.name == 'Range A')
                            if (findObj) findObj.data.push(scatter)
                            else containerScatters.push({
                                name: "Range A",
                                data: scatter
                            })
                        } else if ((typeMttr == 1 && typeMtbf == 3) || (typeMttr == 2 && typeMtbf == 2) || (typeMttr == 3 && typeMtbf == 1)) {
                            // RANGED B
                            containerB.push(mc)
                            let findObj = containerScatters.find(range => range.name == 'Range B')
                            if (findObj) findObj.data.push(scatter)
                            else containerScatters.push({
                                name: "Range B",
                                data: scatter
                            })
                        } else if ((typeMttr == 1 && typeMtbf == 4) || (typeMttr == 2 && typeMtbf == 3) || (typeMttr == 3 && typeMtbf == 2) || (typeMttr == 4 && typeMtbf == 1)) {
                            // RANGED C
                            containerC.push(mc)
                            let findObj = containerScatters.find(range => range.name == 'Range C')
                            if (findObj) findObj.data.push(scatter)
                            else containerScatters.push({
                                name: "Range C",
                                data: scatter
                            })
                        } else if ((typeMttr == 2 && typeMtbf == 4) || (typeMttr == 3 && typeMtbf == 3) || (typeMttr == 4 && typeMtbf == 2)) {
                            // RANGED D
                            containerD.push(mc)
                            let findObj = containerScatters.find(range => range.name == 'Range D')
                            if (findObj) findObj.data.push(scatter)
                            else containerScatters.push({
                                name: "Range D",
                                data: scatter
                            })
                        } else if ((typeMttr == 3 && typeMtbf == 4) || (typeMttr == 4 && typeMtbf == 3)) {
                            // RANGED E
                            containerE.push(mc)
                            let findObj = containerScatters.find(range => range.name == 'Range E')
                            if (findObj) findObj.data.push(scatter)
                            else containerScatters.push({
                                name: "Range E",
                                data: scatter
                            })
                        } else if (typeMttr == 4 && typeMtbf == 4) {
                            // RANGED F
                            containerF.push(mc)
                            let findObj = containerScatters.find(range => range.name == 'Range F')
                            if (findObj) findObj.data.push(scatter)
                            else containerScatters.push({
                                name: "Range F",
                                data: scatter
                            })
                        }
                    }
                    return line
                })
                let objScatter = [
                    containerA,
                    containerB,
                    containerC,
                    containerD,
                    containerE,
                    containerF
                ]
                let resObj = {
                    mapResult,
                    scatters: objScatter,
                    containerScatters
                }


                gettingSuccess(res, 200, resObj)
            }).catch((err) => {
                console.log(err);
                gettingError(res, err)
            });
    }
}