const express = require("express");
const router = express.Router();

const upload = require("../middleware/multerSetup");
const {uploadFile, getImage} = require('../controller/fileUploadController');

// File upload route
router.post('/upload', upload.array("file"), uploadFile);

router.get('/getImage', getImage);

module.exports = router;