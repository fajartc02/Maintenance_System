var express = require('express');
var router = express.Router();

const {
    getParetoData,
    getDetailPareto,
    addFocusTheme,
    finishedTheme,
    getMemberSelectedTheme,
    getStatusTheme,
    updateFocusTheme,
    checkFocusTheme
} = require("../../controllers/focusTheme/controllerProblem")

router.get('/data/pareto', getParetoData)
router.get('/data/pareto/details', getDetailPareto)
router.post('/', addFocusTheme)
router.get('/check/:problem_id', checkFocusTheme)
router.put('/updateFocusTheme/:id_thema', updateFocusTheme)
router.put('/finishedTheme/:vid', finishedTheme)
router.get('/getMemberSelectedTheme', getMemberSelectedTheme)
router.get('/getStatusTheme', getStatusTheme)


module.exports = router