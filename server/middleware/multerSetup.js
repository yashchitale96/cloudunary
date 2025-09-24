const multer = require('multer');

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, res, cb){
        cb(null, "./public/temp");
    },

    filename: function (req, file, cb){
        cb(null, file.originalname);
    },
});

const upload = multer({storage: storage});

module.exports = upload;