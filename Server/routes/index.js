var express = require('express');
var router = express.Router();
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
    poolEnd
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
    signup
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
    sendWhatsapp
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
    getSummaryWeekly
} = require("../controllers/controllerProblem")

const {uploadFile} = require('../middleware/controllerUpload')


const fs = require('fs')
const stream = require('stream')

router.get('/image', async (req, res) => {
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
const {addDataQuality, qualityData, groupDefect, groupWorstMachine, allDefectData, getOneDefectData, editDefectData, removeDefectData} = require('../controllers/controllerQuality')
const { addAnalisys, getAnalisys,editAnalisys, removeAnalisys } = require('../controllers/controllerQualityWhy')
const {addCmQuality, getQualityCm} = require('../controllers/controllerQualityCm')

const { addJobData, getJobData, bulkAddJobData, getOeeData, getYamazumiData, deleteJobData, editJobData } = require('../controllers/job/job')

router.post('/addJobData', addJobData)
router.post('/bulkAddJobData', bulkAddJobData)
router.get('/getJobData', getJobData)
router.get('/getOeeData', getOeeData)
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

// NOTIF
router.get('/sendNotifWhatsapp', sendNotifWhatsapp)
router.post('/sendWhatsapp', sendWhatsapp)

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

router.put('/editProblem/:v_', editProblem)
router.delete('/deleteProblem/:v_', deleteProblem)

router.get('/getHenkaten', getHenkaten)
router.post('/postHenkaten', postHenkaten)
router.delete('/deleteHenkaten/:v_', deleteHenkaten)
router.put('/editHenkaten/:v_', editHenkaten)

router.get('/getDataPareto', getDataPareto)

router.get('/mapMachines', mapMachines)
router.post('/addNewMachine', addNewMachine)

router.get('/poolEnd', poolEnd)



const pca = require('./pca')
const parameter = require('./parameterRoute')

router.use('/pca', pca)
router.use('/parameter', parameter)


module.exports = router;