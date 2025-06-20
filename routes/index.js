var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello from express')
})

const prodDailyRoutes = require('./prod-daily-routes/index')
const {
    getColorDash,
    getLines,
    getMachines,
    getProblemsToday,
    getProblemsHistory,
    getOeeLog,
    getTotalDailyProb,
    getParetoProblem,
    getProbTemp,
    searchMachine,
    addProblem,
    getDetailProblem,
    editProblem,
    deleteProblem,
    getActiveProblem,
    getAllActiveProblem,
    poolEnd,
} = require('../controllers/controllerProdAchievements')

const {
    postHenkaten,
    getHenkaten,
    deleteHenkaten,
    editHenkaten
} = require('../controllers/controllerHenkaten')

const {
    getAllMtMember,
    signin,
    signup,
    getLineMember
} = require('../controllers/controllerMtMember')

const {
    addNewMachine,
    mapMachines
} = require('../controllers/controllerMachine')

const {
    getCmFollowup,
    updateCmFinished
} = require('../controllers/controllerCmFollowup')

const {
    getDataPareto
} = require('../controllers/controllerRealtimePareto')

const {
    addQcData,
    getAllQcData
} = require('../controllers/controllerQcMonitor')

const {
    sendNotifWhatsapp,
    sendWhatsapp,
    notifCmWa
} = require('../controllers/controllerNotif')

const {
    getTemperature,
    getParameterName,
    getAvailableMc,
    getInverterData,
    getAlarmHistory,
    getActiveAlarm,
    getDetailParam
} = require('../controllers/controllerParameters')

const { getAllCtMachines, getCtMcDashboard, getOneCtMachine } = require('../controllers/controllerCtMachine')

const {
    getProblemTemporary,
    getProblemFreq,
    getProblemLtb,
    getProblemChokotei,
    getProblemSmall,
    getSummaryWeekly,
    getProblemByCategory
} = require("../controllers/controllerProblem")

const { uploadFile } = require('../middleware/controllerUpload')


const fs = require('fs')
const stream = require('stream')

const symptom = require('./symptom/index')
router.use('/symptom', symptom)

router.get('/update/server/self', (req, res) => {
    exec(`git pull && npm install && pm2 stop 0 && pm2 delete 0 && npx kill-port 3100 && pm2 start bin/www`, (error, stdout, stderr) => {
        console.log(error, stdout, stderr);
    })
})
router.get('/test-update', (req, res) => {
    res.send('success')
})

router.use('/v1/prod-daily', prodDailyRoutes)

router.get('/image', async(req, res) => {
    let pathImage = `${req.query.path}`
    const r = fs.createReadStream(pathImage) // or any other way to get a readable stream
    const ps = new stream.PassThrough() // <---- this makes a trick with stream error handling
    stream.pipeline(
        r,
        ps, // <---- this makes a trick with stream error handling
        (err) => {
            if (err) {
                console.log(err) // No such file or any other kind of error
                return res.sendStatus(400);
            }
        })
    ps.pipe(res) // <---- this makes a trick with stream error handling
});
router.get('/', function(req, res) {
    // // res.setHeader('Content-Type', 'application/pdf')
    // // res.setHeader('Content-Disposition', 'inline;filename=doc1.pdf')
    // // res.send()
    // var data = fs.readFileSync('./doc1.pdf');
    // res.contentType("application/pdf");
    // res.send(data);

    // var file = fs.createReadStream('./documents/doc1.pdf');
    // var stat = fs.statSync('./documents/doc1.pdf');
    // res.setHeader('Content-Length', stat.size);
    // res.setHeader('Content-Type', 'application/pdf');
    // // res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
    // file.pipe(res);

    const path = './documents/doc1.pdf'
    if (fs.existsSync(path)) {
        res.contentType("application/pdf");
        fs.createReadStream(path).pipe(res)
    } else {
        res.status(500)
            // console.log('File not found')
        res.send('File not found')
    }
})
router.post('/upload', uploadFile)

// Quality Data
const { addDataQuality, qualityData, groupDefect, groupWorstMachine, allDefectData, getOneDefectData, editDefectData, removeDefectData } = require('../controllers/controllerQuality')
const { addAnalisys, getAnalisys, editAnalisys, removeAnalisys } = require('../controllers/controllerQualityWhy')
const { addCmQuality, getQualityCm } = require('../controllers/controllerQualityCm')

const { addJobData, getJobData, bulkAddJobData, getOeeData, getYamazumiData, deleteJobData, editJobData } = require('../controllers/job/job')

const {
    insertParam,
    getParameterList,
    getMachineParameter,
    getDataHistoryParam,
    getListParameterMcs,
    getAdminParam,
    insertAdminParam,
    deleteParameter,
    addParamToMc,
    monitoringParamDashboard,
    machinesDashboard,
    parameterAlertHistory,
    countAlertHistory,
    editParameter
} = require('../controllers/symptomMc/parameterManual')

const { checkScreen, updateScreen } = require('../controllers/screen/controllerScreen')


const { ruleParamManual } = require('../middleware/rulesParameter')
const { updateServer, testing } = require('../controllers/controllerTest')

const { getOeeAllLines, insertOeeLine } = require('../controllers/oee/controllerOee')

router.get('/oeeAllLines', getOeeAllLines)
router.post('/insertOee', insertOeeLine)

// Start::FOCUS THEME ROUTES

const ftRoutes = require('./focus-theme/index')

router.use('/focus-theme', ftRoutes)

const { addAnalisysNew, getAnalisysNew } = require('../controllers/analisys-new/analisys')
router.post('/why_analisys/add/:v_', addAnalisysNew)
router.get('/why_analisys/get/:v_', getAnalisysNew)

// End::FOCUS THEME ROUTES

router.get('/update-server', updateServer)
router.get('/testing', testing)

router.get('/checkScreen', checkScreen)
router.put('/updateScreen', updateScreen)

// Machines Monitoring
const { getMachinesStatus, getDetailAlarm } = require('../controllers/monitoring/machinesMonitoring')
router.get('/monitoring/machines', getMachinesStatus)
router.get('/monitoring/machines/details', getDetailAlarm)

router.get('/dashboard/machines', machinesDashboard)
router.get('/monitoringParam', monitoringParamDashboard)
router.get('/paramHistory', getDataHistoryParam)
router.get('/parameterList', getParameterList)
router.get('/machineParameter', getMachineParameter)
router.get('/parameterAlertHistory', parameterAlertHistory)
router.get('/countAlertHistory', countAlertHistory)
router.post('/insertParamManual', insertParam)
router.put('/parameter/:id', editParameter)

router.get('/admin/parameterToMc', getListParameterMcs)
router.get('/admin/parameter', getAdminParam)
router.post('/admin/parameter', insertAdminParam)
router.delete('/admin/parameter/:fid', deleteParameter)
router.post('/admin/parametertToMachine', addParamToMc)

router.post('/addJobData', addJobData)
router.post('/bulkAddJobData', bulkAddJobData)
router.get('/getJobData', getJobData)
router.get('/getOeeData', getOeeData)

router.get('/getLineMember', getLineMember)

router.get('/getAllMtMember', getAllMtMember)
router.post('/getYamazumiData', getYamazumiData)
router.post('/deleteJobData', deleteJobData)
router.put('/editJobData', editJobData)

router.post('/addDataQuality', addDataQuality)
router.get('/qualityData', qualityData)
router.get('/groupDefect', groupDefect)
router.get('/groupWorstMachine', groupWorstMachine)
router.get('/allDefectData', allDefectData)
router.get('/getOneDefectData', getOneDefectData)
router.put('/editDefectData/:v_', editDefectData)
router.delete('/removeDefectData/:v_', removeDefectData)

router.post('/addAnalisys', addAnalisys)
router.get('/getAnalisys', getAnalisys)
router.put('/editAnalisys/:v_', editAnalisys)
router.delete('/removeAnalisys/:v_', removeAnalisys)

router.get('/getQualityCm/:v_', getQualityCm)
router.post('/addCmQuality', addCmQuality)


// SUMMARY

getProblemByCategory
router.post('/problemCategory', getProblemByCategory)
router.get('/delayProblemCm', getSummaryWeekly)
    // CYCLE TIME MACHINE
router.get('/ctMachines', getAllCtMachines)
router.get('/ctMachinesDashboard', getCtMcDashboard)
router.get('/ctOneMachine', getOneCtMachine)

// QC DATA
router.post('/addQcData', addQcData)
router.get('/getAllQcData', getAllQcData)

// SIGNIN
router.get('/signin', signin)
router.post('/signup', signup)

/* GET home page. */
router.get('/colordash', getColorDash);
router.get('/lines', getLines);
router.get('/searchMc', searchMachine);
router.get('/countTempProb', getProbTemp);
router.get('/machines', getMachines);
router.get('/problemsToday', getProblemsToday);
router.get('/problemHistory', getProblemsHistory)
router.get('/oeeLog', getOeeLog)
router.get('/getTotalDailyProb', getTotalDailyProb)
router.get('/paretoProblem', getParetoProblem)
router.get('/activeProblem', getActiveProblem)
router.get('/getAllActiveProblem', getAllActiveProblem)

router.get('/problemTemporary', getProblemTemporary)
router.get('/problemFreq', getProblemFreq)
router.get('/problemLtb', getProblemLtb)
router.get('/problemChokotei', getProblemChokotei)
router.get('/problemSmall', getProblemSmall)

// NOTIF
router.get('/sendNotifWhatsapp', sendNotifWhatsapp)
router.post('/sendWhatsapp', sendWhatsapp)
router.post('/notifCmWa', notifCmWa)

// CONTERMEASURE
router.get('/cmFollowup', getCmFollowup)
router.post('/updateCmFinished', updateCmFinished)

// TEMPERATURE
router.get('/temperature', getTemperature)
router.get('/paramsName', getParameterName)
router.get('/availableParamMc', getAvailableMc)
router.get('/inverterData', getInverterData)
router.get('/alarmHistory', getAlarmHistory)
router.get('/activeAlarm', getActiveAlarm)
router.get('/detailParam', getDetailParam)


router.post('/addProblem', addProblem)
router.get('/getDetailProblem', getDetailProblem)

const newUpload = require("../functions/newUpload")

router.put('/editProblem/:v_', newUpload.fields(
    [{
            name: 'fimage_problem',
            maxCount: 1
        },
        {
            name: 'std_img',
            maxCount: 1
        },
        {
            name: 'act_img',
            maxCount: 1
        },
        {
            name: 'why1_img',
            maxCount: 1
        },
        {
            name: 'why2_img',
            maxCount: 1
        },
        {
            name: 'fimage2_problem',
            maxCount: 1
        },
        {
            name: 'std2_img',
            maxCount: 1
        },
        {
            name: 'act2_img',
            maxCount: 1
        },
        {
            name: 'why12_img',
            maxCount: 1
        },
        {
            name: 'why22_img',
            maxCount: 1
        },

    ]
), editProblem)
router.delete('/deleteProblem/:v_', deleteProblem)

router.get('/getHenkaten', getHenkaten)
router.post('/postHenkaten', postHenkaten)
router.delete('/deleteHenkaten/:v_', deleteHenkaten)
router.put('/editHenkaten/:v_', editHenkaten)

router.get('/getDataPareto', getDataPareto)

router.get('/mapMachines', mapMachines)
router.post('/addNewMachine', addNewMachine)

router.get('/poolEnd', poolEnd)

const { getMtbf } = require('../controllers/mtbfMttr/controllerMtbfMttr');
const { exec } = require('child_process');
const { stderr } = require('process');
const { getProblemAnalisys } = require('../controllers/problemAnalisys/problemAnalisys');

router.get('/problem-analisys', getProblemAnalisys)

router.get('/mtbf-mttr', getMtbf)


const qcc = require('./qcc/index')
router.use('/qcc', qcc)

const v2 = require('./v2/index')
router.use('/v2', v2)

module.exports = router;