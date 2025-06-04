const express = require('express');
const router = express.Router();
const { getParameters, getAvailableMc } = require('../controllers/symptomMc/parameterGet')

router.get('/get/parameters', getParameters)
router.get('/get/machines', getAvailableMc)

module.exports = router