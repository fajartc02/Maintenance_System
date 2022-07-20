const router = require('express').Router();
const StravaController = require('../../controllers/StravaController');
const verifyToken = require('../../middleware/verifyToken');
const cors = require('cors');

router.post('/webhook', StravaController.stravaWebhook);
router.get('/webhook', StravaController.verifyWebhook);
router.get('/exchangeToken', StravaController.exchangeToken);
router.get('/verify', verifyToken, StravaController.isStravaConnected);

module.exports = router;