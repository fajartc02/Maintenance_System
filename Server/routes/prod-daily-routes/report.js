var express = require('express');
var router = express.Router();

let {
    generateReport,
    getReport,
    inputDataOutput,
    inputDataAv,
    getAvData,
    inputPeData,
    inputRqData,
    getPeData,
    getRqData,
    editAvData,
    editPeData,
    editRqData,
    deleteAvData,
    deleteRqData,
    deletePeData
} = require('../../controllers/daily-prod-report/controllerReport')

// /report/whatever
router.get('/', getReport)
router.post('/generate/:is_day/:is_friday', generateReport)

router.post('/inputDataOutput/:_id', inputDataOutput)

router.post('/inputDataAv/:_id', inputDataAv)
router.get('/avData/:_id', getAvData)
router.put('/avData/:_id', editAvData)
router.delete('/avData/:_id', deleteAvData)

router.post('/inputDataPe', inputPeData)
router.get('/peData/:_id', getPeData)
router.put('/peData/:_id', editPeData)
router.delete('/peData/:_id', deletePeData)

router.post('/inputDataRq', inputRqData)
router.get('/rqData/:_id', getRqData)
router.put('/rqData/:_id', editRqData)
router.delete('/rqData/:_id', deleteRqData)


module.exports = router