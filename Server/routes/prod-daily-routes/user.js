let express = require('express');
let router = express.Router();

const { login } = require('../../controllers/daily-prod-report/controllerUser')

router.post('/login', login)

module.exports = router