const router = require('express').Router();

const ActivityController = require('../../controllers/ActivityController');

router.get('/', ActivityController.index);
router.get('/:uuid', ActivityController.show);
router.post('/', ActivityController.store);
router.put('/:uuid', ActivityController.save);
router.delete('/:uuid', ActivityController.destroy);

module.exports = router;