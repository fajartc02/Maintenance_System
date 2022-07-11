var express = require('express');
var router = express.Router();

const { getLines } = require('../../controllers/daily-prod-report/controllerLine')

router.get('/', getLines)


module.exports = router