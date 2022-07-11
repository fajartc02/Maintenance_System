var express = require('express');
var router = express.Router();

let {
    generateReport,
    getReport,
    inputDataOutput,
    inputDataAv,
    getAvData,
    inputPeData,
    inputRqData
} = require('../../controllers/daily-prod-report/controllerReport')


router.get('/', getReport)
router.post('/generate/:is_day/:is_friday', generateReport)

router.post('/inputDataOutput/:_id', inputDataOutput)

router.post('/inputDataAv/:_id', inputDataAv)
router.get('/avData/:_id', getAvData)

router.post('/inputDataPe', inputPeData)

router.post('/inputDataRq', inputRqData)


module.exports = router