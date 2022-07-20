const router = require('express').Router()

router.use('/', require('./auth'));
router.use('/users', require('./users'));
router.use('/divisions', require('./divisions'));
router.use('/events', require('./events'));
router.use('/competitions', require('./competitions'));
// router.use('/winners', require('./winners'));
router.use('/strava', require('./strava'));

module.exports = router;