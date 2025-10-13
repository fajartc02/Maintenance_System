let express = require('express');
let router = express.Router();

const { getProduct } = require('../../controllers/daily-prod-report/controllerProductType')

router.get('/', getProduct)


module.exports = router