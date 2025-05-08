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
    getInverterData
} = require('../controllers/controllerParameters')

const { getAllCtMachines, getCtMcDashboard, getOneCtMachine } = require('../controllers/controllerCtMachine')

const {
    getProblemTemporary,
    getProblemFreq,
    getProblemLtb,
    getSummaryWeekly
} = require("../controllers/controllerProblem")



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