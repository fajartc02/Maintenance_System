// // const fs = require('fs')

// // fs.readFile('./record_machine_parameter_vibration.csv', 'utf-8', function(err, data) {
// //             if (err) throw err
// //             let splitDataEnt = data.split('\r\n')
// //             let containerValues = []

// //             for (let i = 0; i < splitDataEnt.length; i++) {
// //                 const element = splitDataEnt[i];
// //                 let splitSemiCol = element.split(';')
// //                 let id_mc = splitSemiCol[1]
// //                 let id_param = splitSemiCol[3]
// //                 let value = splitSemiCol[8]
// //                 let clock = `${splitSemiCol[7]}-${splitSemiCol[6] < 10 ? `0${splitSemiCol[6]}` : splitSemiCol[6]}-15`

// //         console.log(splitSemiCol);
// //         if (i > 0) {
// //             containerValues.push(`(${id_mc}, ${id_param}, ${1}, ${value}, '${clock}')`)
// //         }
// //     }
// //     let queryTotal = `INSERT INTO o_history_parameter_value (id_m_machine, id_m_parameter, id_m_severity, value, clock) VALUES ${containerValues.join(',')}`
// //     console.log(queryTotal);
// // })

// // async function runInsertData() {
// //     let machineList = await cmdMultipleQuery(`SELECT * FROM v_machine_parameter WHERE is_auto = 0 AND id_parameter = 1`)
// //         .then((result) => {
// //             return result
// //         }).catch((err) => {
// //             return err
// //         });
// //     let containerLastValue = []
// //     let mapValueParam = await machineList.map(async item => {
// //         let value_param = await cmdMultipleQuery(`SELECT id_m_machine, id_m_parameter, value, MIN(clock) AS clock FROM o_history_parameter_value WHERE id_m_machine = ${item.id_machine} AND id_m_parameter = ${item.id_parameter}`)
// //             .then((result) => {
// //                 return result[0]
// //             }).catch((err) => {
// //                 return err
// //             });
// //         return value_param
// //     })
// //     let waitValParam = await Promise.all(mapValueParam).then(result => {
// //         return result
// //     })
// //     let containerVals = []
// //     await waitValParam.forEach((itm) => {
// //         let yearLeft = ((itm.clock ? itm.clock.getFullYear() : 0) - 2016) * 2
// //         let substractFixed = (1000 * 60 * 60 * 24 * (365 / 2))
// //         for (let i = 1; i <= yearLeft; i++) {
// //             let offsetDate = itm.clock.getTime() - substractFixed * i
// //             let dateConvert = `${new Date(offsetDate).toISOString()}`.split('T')[0]
// //             let randomMath = Math.floor(Math.random() * (0.2 - 0.3 + 1)) + 0.3;
// //             // Math.floor(Math.random() * (0.01 - 0.02 + 1)) + 0.02;

// //             let q_vals = `(${itm.id_m_machine}, ${itm.id_m_parameter}, ${1}, ${(itm.value + (Math.random())).toFixed(2)}, '${dateConvert}')`
// //             console.log(q_vals);
// //             containerVals.push(q_vals)
// //         }
// //     })
// //     let queryTotal = `INSERT INTO o_history_parameter_value (id_m_machine, id_m_parameter, id_m_severity, value, clock) VALUES ${containerVals.join(',')}`
// //     console.log(queryTotal);
// // }

// async function runInsertQueryGenerator() {
//     let machineList = await cmdMultipleQuery(`SELECT * FROM v_machine_parameter WHERE is_auto = 0 AND id_parameter = 6`)
//         .then((result) => {
//             return result
//         }).catch((err) => {
//             return err
//         });
//     let containerLastValue = []
//     console.log(machineList);
//     let mapValueParam = await machineList.map(async item => {
//         let value_param = await cmdMultipleQuery(`SELECT id_m_machine, id_m_parameter, value, MIN(clock) AS clock FROM o_history_parameter_value WHERE id_m_machine = ${item.id_machine} AND id_m_parameter = ${item.id_parameter}`)
//             .then((result) => {
//                 return result[0]
//             }).catch((err) => {
//                 return err
//             });
//         return value_param
//     })
//     let waitValParam = await Promise.all(mapValueParam).then(result => {
//         // console.log(result);
//         return result
//     })
//     let containerVals = []
//     console.log(waitValParam);
//     await waitValParam.forEach((itm) => {
//         console.log(itm);
//         let monthSubstract = 4 // 3 = 4 bulan 4 = 3 bulan
//         let yearLeft = ((itm.clock ? itm.clock.getFullYear() : 0) - 2020) * monthSubstract
//             // let yearLeft = (2022 - (itm.clock ? itm.clock.getFullYear() : 0)) * monthSubstract
//         let substractFixed = (1000 * 60 * 60 * 24 * (365 / monthSubstract))

//         for (let i = 1; i <= yearLeft; i++) {
//             // for (let i = yearLeft; i >= 1; i--) {
//             let offsetDate = itm.clock.getTime() - substractFixed * i
//                 // let offsetDate = itm.clock.getTime() + substractFixed * i
//             let dateConvert = `${new Date(offsetDate).toISOString()}`.split('T')[0]
//             let rand = (Math.random() * (0.445 - 0.497)) + 0.497;
//             // let q_vals = `(${itm.id_m_machine}, ${itm.id_m_parameter}, ${1}, ${(itm.value + (rand)).toFixed(4)}, '${dateConvert}')`
//             let q_vals = `(${itm.id_m_machine}, ${itm.id_m_parameter}, ${1}, ${((rand)).toFixed(3)}, '${dateConvert}')`
//             console.log(q_vals);
//             containerVals.push(q_vals)
//         }
//     })
//     let queryTotal = `INSERT INTO o_history_parameter_value (id_m_machine, id_m_parameter, id_m_severity, value, clock) VALUES ${containerVals.join(',')}`
//     console.log(queryTotal);
// }

// const cmdMultipleQuery = require('./config/MultipleQueryConnection')

// function checkMTBF() {
//     cmdMultipleQuery(`
// select
//     count(fmc_name) as total_problem,
//     fmc_name,
//     fstart_time,
//     fend_time,
//     SUM(fdur) as total_duration
// from v_current_error_2
//     where fline like "%assy line%" AND
//     fdur >= 10 and
//     fstart_time between '2022-10-01' AND '2022-10-31'
// GROUP BY fmc_name
// ORDER BY fmc_name`)
//         .then(result => {
//             console.log(result);
//             // ====== RUMUS MTBF ======
//             // mtbfByMc = workingHour / totalProblem
//             // ====== RUMUS MTTR ======
//             // mttrByMc = totalTimeRepair / totalProblem
//             let mapMtbfMttrResult = result.map(itm => {
//                 console.log(itm);
//                 return {
//                     // date: itm.fstart_time.toString().split('T')[0],
//                     machine: itm.fmc_name,
//                     // mtbf: 336 / itm.total_problem,
//                     total_problem: itm.total_problem,
//                     // mttr: itm.total_duration / itm.total_problem,
//                     total_repair: (+itm.total_duration / 60).toFixed(1)
//                 }
//             })
//             console.table(mapMtbfMttrResult)
//                 // console.log(mapMtbfMttrResult);
//         })
//         .catch(err => {
//             console.error(err);
//         })
// }

// checkMTBF()

// function generateDayWiseTimeSeries(s, count) {
//     var values = [
//         [
//             4, 3, 10, 9, 29, 19, 25, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5
//         ],
//         [
//             2, 3, 8, 7, 22, 16, 23, 7, 11, 5, 12, 5, 10, 4, 15, 2, 6, 2
//         ]
//     ];
//     var i = 0;
//     var series = [];
//     var x = new Date("05 Nov 2023").getTime();
//     while (i < count) {
//         series.push([x, values[s][i]]);
//         x += 86400000;
//         i++;
//     }
//     console.log(series);
//     return series;
// }

// generateDayWiseTimeSeries(1, 18)

console.log('\\');