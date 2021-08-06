const express = require('express');

const router = express.Router();

const { uploadFiles } = require('../controllers/editor')

router.use('/uploadfiles', uploadFiles)

module.exports = router