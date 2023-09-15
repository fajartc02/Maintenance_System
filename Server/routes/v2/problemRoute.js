var router = require('express').Router();
const problemCont = require('../../controllers/v2/problemCont')


router.get('/problem', problemCont.getProblem)
router.post('/problem', problemCont.addNewProblem)



module.exports = router