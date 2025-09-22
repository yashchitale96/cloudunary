const express = require('express');
const router = express.Router();
const uploadImage = require('../controller/uploadImage')

router.post('/upload', uploadImage);

module.exports = router;