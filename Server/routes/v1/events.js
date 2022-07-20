const router = require('express').Router();

const EventController = require('../../controllers/EventController');
const verifyToken = require('../../middleware/verifyToken');

router.get('/', verifyToken, EventController.index);
router.get('/:uuid', verifyToken, EventController.show);
router.post('/', verifyToken, EventController.store);
router.put('/:uuid', verifyToken, EventController.save);
router.delete('/:uuid', verifyToken, EventController.destroy);

module.exports = router;