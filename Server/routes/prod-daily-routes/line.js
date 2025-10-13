let express = require('express');
let router = express.Router();

const { getLines } = require('../../controllers/daily-prod-report/controllerLine')

router.get('/', getLines)


module.exports = router