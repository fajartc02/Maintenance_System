const multer = require("multer");

//Setting storage engine
const storageEngine = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log(file);
        cb(null, `./uploads/ky/`);
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    },
});

//initializing multer
const uploadKyImg = multer({
    storage: storageEngine,
    limits: { fileSize: 50000000 }, // 50 MB Max
});

module.exports = uploadKyImg;