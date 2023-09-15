var router = require('express').Router();

const problemRoute = require('./problemRoute')

router.use('/master', problemRoute)

module.exports = router