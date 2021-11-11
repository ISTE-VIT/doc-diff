const router = require('express').Router();

const { signUp, google } = require('../controllers/users.js');

router.post('/signup', signUp);
router.post('/google', google);

module.exports = router;