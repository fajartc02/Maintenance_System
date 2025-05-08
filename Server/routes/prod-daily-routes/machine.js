var express = require('express');
var router = express.Router();

const {
    mapMachines
} = require('../../controllers/controllerMachine')

router.get('/', mapMachines)

module.exports = router