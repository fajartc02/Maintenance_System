let express = require('express');
let router = express.Router();

const parameters = require('./parameters/')


router.use('/parameters', parameters)


module.exports = router