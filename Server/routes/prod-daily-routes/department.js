let express = require('express');
let router = express.Router();

const { getDepartment } = require('../../controllers/daily-prod-report/controllerDept')

router.get('/', getDepartment)


module.exports = router