var express = require('express');
var router = express.Router();

const parameters = require('./parameters/')


router.use('/parameters', parameters)


module.exports = router