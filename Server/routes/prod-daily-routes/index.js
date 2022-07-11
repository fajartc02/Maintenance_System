var express = require('express');
var router = express.Router();

let reportRoutes = require('./report')
let lineRoutes = require('./line')
let deptRoutes = require('./department')
let productRoutes = require('./product_type')
let shiftRoutes = require('./shift')
let groupRoutes = require('./group')
let userRoutes = require('./user')
let machineRoutes = require('./machine')

router.use('/', userRoutes)

router.use('/report', reportRoutes)
router.use('/line', lineRoutes)
router.use('/machines', machineRoutes)
router.use('/department', deptRoutes)
router.use('/product', productRoutes)
router.use('/shift', shiftRoutes)
router.use('/group', groupRoutes)

module.exports = router