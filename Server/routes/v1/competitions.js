const router = require('express').Router();

const CompetitionController = require('../../controllers/CompetitionController');
const verifyToken = require('../../middleware/verifyToken');

router.get('/', verifyToken, CompetitionController.index);
router.get('/:uuid', verifyToken, CompetitionController.show);
router.post('/', verifyToken, CompetitionController.store);
router.put('/:uuid', verifyToken, CompetitionController.save);
router.delete('/:uuid', verifyToken, CompetitionController.destroy);

router.get('/:uuid/winners', verifyToken, CompetitionController.getWinners);
router.post('/:uuid/winners', verifyToken, CompetitionController.createWinners);

router.post('/:uuid/registrations', verifyToken, CompetitionController.registration);

module.exports = router;