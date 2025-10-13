let express = require('express');
let router = express.Router();

const {
    mapMachines
} = require('../../controllers/controllerMachine')

router.get('/', mapMachines)

module.exports = router