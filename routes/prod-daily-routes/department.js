var express = require('express');
var router = express.Router();

const { getDepartment } = require('../../controllers/daily-prod-report/controllerDept')

router.get('/', getDepartment)


module.exports = router