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
    checkFocusTheme,
    countMemberStatus,
    getFocusTheme,
    getMemberFTNotYet,
    countTaskForce,
    getTaskforce,
    getNotyetTF
} = require("../../controllers/focusTheme/controllerProblem")

router.get('/member_notyet', getMemberFTNotYet)
router.get('/data/pareto', getParetoData)
router.get('/data/pareto/details', getDetailPareto)
router.post('/', addFocusTheme)
router.get('/check/:problem_id', checkFocusTheme)
router.put('/updateFocusTheme/:id_thema', updateFocusTheme)
router.put('/finishedTheme/:vid', finishedTheme)
router.get('/getMemberSelectedTheme', getMemberSelectedTheme)
router.get('/getStatusTheme', getStatusTheme)
router.get('/countMemberStatus', countMemberStatus)
router.get('/countTaskForce', countTaskForce)
router.get('/detailTaskforce', getTaskforce)
router.get('/notyetTaskforce', getNotyetTF)
router.get('/', getFocusTheme)
router.get('/:id_member', getFocusTheme)



module.exports = router