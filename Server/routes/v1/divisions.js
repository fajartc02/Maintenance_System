const router = require('express').Router();

const DivisionController = require('../../controllers/DivisionController');
const verifyToken = require('../../middleware/verifyToken');

router.get('/', verifyToken, DivisionController.index);
router.get('/dropdown', DivisionController.dropdown);
router.get('/:uuid', verifyToken, DivisionController.show);
router.post('/', verifyToken, DivisionController.store);
router.put('/:uuid', verifyToken, DivisionController.save);
router.delete('/:uuid', verifyToken, DivisionController.destroy);


module.exports = router;