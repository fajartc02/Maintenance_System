var express = require('express');
var router = express.Router();

const { getMember } = require('../../controllers/daily-prod-report/controllerMember')

router.get('/', getMember)


module.exports = router