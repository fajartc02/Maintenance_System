var express = require('express');
var router = express.Router();

const { getProduct } = require('../../controllers/daily-prod-report/controllerProductType')

router.get('/', getProduct)


module.exports = router