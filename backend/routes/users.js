const express = require('express');

const router = express.Router();

const { signIn, signUp, google } = require('../controllers/users.js');
const User = require('../models/User');

router.post('/signin', signIn);
router.post('/signup', signUp);
router.post('/google', google);

module.exports = router;