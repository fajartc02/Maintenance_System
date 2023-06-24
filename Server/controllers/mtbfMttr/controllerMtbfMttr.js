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
            .then((result) => {
                let workingHour = 1020
                    // result[0~6] => [{fline: LINE, totoalMc: 00}]
                    // result[7~13] => [{fline: LINE, fmc_name: MC, totalRepair: 00}]
                    // result[14~20] => [{ fline: LINE, fmc_name: MC, countTotalProblem: 00 }]
                let totalMcsLines = result.slice(0, 7)
                let totalTimeRepairMcs = result.slice(7, 14)
                let totalProblemMcs = result.slice(14, 21)
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

                    // console.log(`KRITERIA PROBLEM > 30 Menit all Lines, Working Hour: ${workingHour}`);
                    // console.table([{ line: line.fline, mtbf: +mtbfByLine.toFixed(1), mttr: +mttrByLine.toFixed(1), totalRepairLine, totalProbLine }])
                    console.log(line);
                    return line
                })


                gettingSuccess(res, 200, mapResult)
            }).catch((err) => {
                console.log(err);
                gettingError(res, err)
            });
    }
}