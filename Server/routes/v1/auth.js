const router = require('express').Router();

const AuthController = require('../../controllers/AuthController');
const UserController = require('../../controllers/UserController');
const verifyToken = require('../../middleware/verifyToken');

// Auth
router.post('/login', AuthController.login);
router.post('/logout', verifyToken, AuthController.logout);
router.post('/register', UserController.store);
router.post('/verify', verifyToken, AuthController.verify);
router.get('/profile', verifyToken, AuthController.profile);

module.exports = router;