let express = require('express');
let router = express.Router();

const { getGroups } = require('../../controllers/daily-prod-report/controllerGroup')

router.get('/', getGroups)


module.exports = router