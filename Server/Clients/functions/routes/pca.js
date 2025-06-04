var express = require('express');
var router = express.Router();

const { addWarga } = require('../controllers/pca/controllerWarga')


router.post('/registerWarga', addWarga)


module.exports = router