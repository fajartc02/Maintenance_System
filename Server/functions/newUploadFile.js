const multer = require("multer");

const path = require("path");
const fs = require("fs");

//Setting storage engine
const storageEngine = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log(file);
        const uploadPath = `./reports/Uploads/${req.body.fid}_${req.body.problem}/`;
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const ext = path.extname(file.originalname) || ".xlsx";
        cb(null, `${req.body.problem}_${timestamp}${ext}`);
    },
});

//initializing multer
const uploadFileReport = multer({
    storage: storageEngine,
    limits: { fileSize: 50000000 }, // 50 MB Max
});

module.exports = uploadFileReport;
