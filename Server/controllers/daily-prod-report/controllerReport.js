const cmdMultipleQuery = require('../../config/MultipleQueryConnection');
const tableTrReport = `tr_report`
const trTimeOutputReport = `tr_time_output_report`
const formatDate = require('../../functions/formatDate')

const generateQInstTime = require('../../functions/prod-daily-functions/generateQInstTime')
const insertDataTable = require('../../functions/prod-daily-functions/insertDataTable')

const getDataAch = require('./functions/getDataAch')
const getDataOutput = require('./functions/getDataOutput')
const getReport = require('./functions/getReport')
const getAvData = require('./functions/getAvData')
const getPeData = require('./functions/getPeData')
const getRqData = require('./functions/getRqData')

const calculateAv = require('./functions/calculateAv')
const calculatePe = require('./functions/calculatePe')

const avController = require('./av-controller/index')
const peController = require('./pe-controller/index')
const rqController = require('./rq-controller')

module.exports = {
    generateReport: async(req, res) => {
        let {
            id_m_line,
            id_m_department,
            id_m_product_type,
            id_m_shift,
            id_m_group,
            id_m_member,
            takt_time,
        } = req.body
        let id_tr_report_created = null
        console.log(req.body);

        let {
            is_day = null,
                is_friday = null
        } = req.params

        let containerColReport = ['id_m_line', 'id_m_department', 'id_m_product_type', 'id_m_shift', 'id_m_group', 'id_m_member', 'takt_time']
        let containerValues = [id_m_line, id_m_department, id_m_product_type, id_m_shift, id_m_group, id_m_member, takt_time]
        try {
            await insertDataTable(tableTrReport, containerColReport, containerValues)
                .then(result => {
                    id_tr_report_created = result.insertId
                })
            await generateQInstTime(is_day, is_friday)
                .then((result) => {
                    console.log(result)
                    let mTimesData = result
                    let containerStrQTime = []
                    mTimesData.forEach(time => {
                        let strQ = `(${id_tr_report_created}, ${time.id})`
                        containerStrQTime.push(strQ)
                    })
                    let qInstTrOutput = `INSERT INTO tr_time_output_report
                    (id_tr_report, id_m_time)
                    VALUES ${containerStrQTime.join(',')}`
                    console.log(qInstTrOutput);
                    // CREATE TEMPLATE OUTPUT DATA
                    cmdMultipleQuery(qInstTrOutput)
                        .then(resultInstOutTime => {
                            console.log(resultInstOutTime);
                            res.status(201).json({
                                message: 'Report Anda Berhasil Di Buat'
                            })
                        })

                })
            console.log(id_tr_report_created);
        } catch (error) {
            res.status(500).json({
                message: 'Error',
                err: error
            })
        }
    },
    getReport: async(req, res) => {
        let { selected_date, id_m_shift, id_m_group, id_m_line } = req.query
        let search = 'WHERE 1=1'
        if (selected_date) {
            search += ` AND DATE(date_report)='${selected_date}'`
        }
        if (id_m_shift && id_m_shift > 0) {
            search += ` AND id_m_shift=${id_m_shift}`
        }
        if (id_m_group && id_m_group > 0) {
            search += ` AND id_m_group=${id_m_group}`
        }
        if (id_m_line && id_m_line > 0) {
            search += ` AND id_m_line=${id_m_line}`
        }

        try {
            // getProdAchivement

            let report = await getReport(search)

            // console.log(outputData);
            // console.log(avData);
            let containerObjReport = []
            let totalOutCommu = 0
            if (report) {
                let id_report = report.id_report
                let outputData = await getDataOutput(id_report)
                await outputData.forEach((item, i) => {
                    let objReportOutput = {
                        achData: [],
                        avData: [],
                        peData: [],
                        rqData: [],
                        oeeData: null,
                        lsData: null
                    }

                    item.output_commu = 0
                    item.total_output = 0
                    item.bal_output = 0
                    totalOutCommu += item.output_actual ? item.output_actual : 0
                    if (!item.output_actual) {
                        totalOutCommu = 0
                    }
                    item.total_output += totalOutCommu
                    item.output_commu += totalOutCommu
                    item.bal_output = totalOutCommu - item.target_actual
                    objReportOutput.achData.push(item)
                        // objReportOutput.avData = avData
                    containerObjReport.push(objReportOutput)
                })
                let container = []
                for (let i = 0; i < containerObjReport.length; i++) {
                    const element = containerObjReport[i];
                    // rumus oee = av * pe * rq
                    getAvData(containerObjReport[i].achData[0].id)
                        .then(resAv => {
                            element.avData = resAv.map(o => {
                                let obj = {
                                    id_tr_time_output_report: o.id_tr_time_output_report,
                                    id_av: o.id_av,
                                    fline: o.fline,
                                    id_m_machine: o.id_m_machine,
                                    fmc_name: o.fmc_name,
                                    problem: o.problem,
                                    action: o.action,
                                    start_time: o.start_time,
                                    end_time: o.end_time,
                                    minute: (new Date(o.end_time).getTime() - new Date(o.start_time).getTime()) / 1000 / 60
                                }
                                return obj
                            })
                            let totalMinutesAv = 0
                            element.avData.forEach(itemAv => {
                                totalMinutesAv += itemAv.minute
                            })
                            element.lsData += totalMinutesAv

                            getPeData(containerObjReport[i].achData[0].id)
                                .then(resPe => {
                                    element.peData = resPe.map(o => {
                                        let obj = {
                                            id_tr_time_output_report: o.id_tr_time_output_report,
                                            id: o.id,
                                            problem: o.problem,
                                            start_time: o.start_time,
                                            end_time: o.end_time,
                                            minute: (new Date(o.end_time).getTime() - new Date(o.start_time).getTime()) / 1000 / 60
                                        }
                                        return obj
                                    })
                                    let totalMinutesPe = 0
                                    element.peData.forEach(itemPe => {
                                        totalMinutesPe += itemPe.minute
                                    })
                                    element.lsData += totalMinutesPe
                                    getRqData(containerObjReport[i].achData[0].id)
                                        .then(resRq => {
                                            element.rqData = resRq
                                            let totalRq = 0
                                            element.rqData.forEach(itemRq => {
                                                totalRq += itemRq.total
                                            })
                                            let total_minute = containerObjReport[i].achData[0].desc_minutes
                                            let total_output = containerObjReport[i].achData[0].total_output
                                            let av = calculateAv(totalMinutesAv, parseInt(total_minute))
                                            let pe = calculatePe(totalMinutesPe, parseInt(total_minute))
                                            let rq = (totalRq != 0) ? (100 - ((totalRq / total_output) * 100)) : 100
                                            let oeeData = (av * pe * rq) / 10000
                                            element.oeeData = (oeeData >= 1000) ? parseInt(oeeData / 1000) : parseInt(oeeData)
                                            container.push(element)
                                            if (container.length == containerObjReport.length) {
                                                res.status(200).json({
                                                    message: 'ok',
                                                    data: containerObjReport,
                                                    line: report.line,
                                                    department: report.department,
                                                    shift: report.shift,
                                                    group_name: report.group_name,
                                                    product_type: report.product_type,
                                                    takt_time: report.takt_time
                                                })
                                            }
                                        })
                                })
                        })
                }
            } else {
                res.status(200).json({
                    message: 'ok',
                    data: []
                })
            }
        } catch (err) {
            res.status(500).json({
                message: 'err',
                err
            })
        }
    },
    inputDataOutput: (req, res) => {
        let { _id } = req.params
            // col1=val1, 
        let containerValues = []
        for (const key in req.body) {
            const value = req.body[key];
            let str = `${key} = ${value}`
            containerValues.push(str)
        }
        let q = `UPDATE tr_time_output_report SET ${containerValues.join(', ')} WHERE id = ${_id}`
        console.log(q);
        cmdMultipleQuery(q)
            .then((result) => {
                res.status(201).json({
                    message: 'Success',
                    data: result
                })
            }).catch((err) => {
                res.status(500).json({
                    message: 'Error',
                    err
                })
            });
    },
    ...avController,
    ...peController,
    ...rqController
}

// let prodReportData = result
// let sampleObjReport = [{
//     achData: [{
//         id: 0,
//         prodMin: `10'`,
//         descClock: `07:30~08:00`,
//         targetPlan: `50`,
//         targetAct: `50`,
//         outputPlan: `40`,
//         outputAct: `40`,
//         outputCommu: `40`,
//         totalOutput: `40`,
//         balanceOutput: `-10`,
//     }],
//     avData: [{
//             id: 0,
//             machine: "IMSP-0001",
//             problem: "Lifter rise solenoid fault brooo",
//             minute: "30",
//             action: "1. buka cover, 2. setting datum, 3. trial mesin, 4. Check QC",
//         },
//         {
//             id: 0,
//             machine: "IMSP-0001",
//             problem: "Lifter rise solenoid fault brooo",
//             minute: "30",
//             action: "1. buka cover, 2. setting datum, 3. trial mesin, 4. Check QC",
//         },
//     ],
//     peData: [{
//             id: 0,
//             problem: "Kajiri",
//             minute: "30",
//         },
//         {
//             id: 1,
//             problem: "Zansha",
//             minute: "30",
//         },
//         {
//             id: 2,
//             problem: "Kajiri-0003",
//             minute: "30",
//         },
//     ],
//     rqData: [],
//     oeeData: 98.4,
//     lsData: 123,
// }, ]