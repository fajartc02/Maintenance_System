var express = require('express');
var router = express.Router();
const { getData } = require('../../../controllers/monitoring/symptomControllers')

router.get('/summarizedLinesAlarm', getData.lineSummarized)

router.get('/machinesStatus', getData.machinesStatus)

module.exports = router