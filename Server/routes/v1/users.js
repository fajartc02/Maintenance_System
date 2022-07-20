const router = require('express').Router();

const UserController = require('../../controllers/UserController');
const verifyToken = require('../../middleware/verifyToken');

router.get('/', verifyToken, UserController.index);
router.get('/:uuid', verifyToken, UserController.show);
router.post('/', verifyToken, UserController.store);
router.put('/:uuid', verifyToken, UserController.save);
router.delete('/:uuid', verifyToken, UserController.destroy);

router.post('/activate/:uuid', verifyToken, UserController.activate);

module.exports = router;