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
    mtbfByLine = totalMc(line) * workingHour
    ======RUMUS MTTR======
    mttrByMc = totalTimeRepair / totalProblem
    mttrByLine = totalTimeRepair(line) / totalProblem(line)
*/

module.exports = {
    getMtbf: (req, res) => {
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
            // let qTotalProblem
            // CAST(expression AS TYPE);
        for (let i = 0; i < containerLine.length; i++) {
            const line = containerLine[i];
            let qTotalMc = `SELECT fline, count(fid) as totalMc FROM ${tableMachine} WHERE fline like '%${line.name}%'`
            let qSumProbMc = `SELECT fline, fmc_name, sum(fdur) as sumTotalProblem from ${ViewCurrentError2} where fline like '%${line.name}%' AND fstart_time BETWEEN '2022-06-01 07:00:00' AND '2022-06-30 18:00:00' GROUP BY fmc_name`
            let qCountProbMc = `SELECT fline, fmc_name, count(fid) as countTotalProblem from ${ViewCurrentError2} where fline like '%${line.name}%' AND fstart_time BETWEEN '2022-06-01 07:00:00' AND '2022-06-30 18:00:00' GROUP BY fmc_name`
            containerQueryTotalMc.push(qTotalMc)
            containerQuerySumProblemMc.push(qSumProbMc)
            containerQueryCountProblemMc.push(qCountProbMc)
        }
        // 0 - 6 (total mc)
        // 7 - 13 (sumProb / Mc)
        // 14 - 20 (count total problem / mc)
        cmdMultipleQuery(containerQueryTotalMc.join(';') + ';' + containerQuerySumProblemMc.join(';') + ';' + containerQueryCountProblemMc.join(';'))
            .then((result) => {
                let container = []
                let mapResult = result.map((itemData, i) => {
                    // console.log(itemData);
                    let obj = {}
                    for (let j = 0; j < itemData.length; j++) {
                        const elemData = itemData[j];
                        // console.log(elemData);
                        if (i >= 0 && i <= 6) {
                            // console.log(elemData);
                            obj.line = elemData.fline
                            obj.totalMc = elemData.totalMc
                            obj.machinesSumRepair = result[i + 7]
                            result[i + 7].forEach((itm, k) => {
                                itm.mttr = (itm.sumTotalProblem / 60) / result[i + 14][k].countTotalProblem
                                    // mttrByLine = totalTimeRepair(line) / totalProblem(line)
                            })
                            let spliceArr = result.slice(0, 13)
                            let mapSumTotalRepair = spliceArr.map(itm => {
                                return +itm.sumTotalProblem
                            })
                            console.log(spliceArr);
                            const sum = mapSumTotalRepair.reduce(add, 0); // with initial value to avoid when the array is empty

                            function add(accumulator, a) {
                                return accumulator + a;
                            }
                            obj.mttrLine = sum
                            result[i + 14].forEach((itm, k) => {
                                itm.mtbf = (20 * 16) / itm.countTotalProblem
                            })
                            obj.machinesCountProb = result[i + 14]
                        }
                    }
                    // console.log(elemData);
                    return obj
                })

                gettingSuccess(res, 200, mapResult)
            }).catch((err) => {
                console.log(err);
                gettingError(res, err)
            });
    }
}