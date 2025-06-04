var express = require('express');
var router = express.Router();

const { getShifts } = require('../../controllers/daily-prod-report/controllerShift')

router.get('/', getShifts)


module.exports = router