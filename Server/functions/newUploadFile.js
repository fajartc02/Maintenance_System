const multer = require("multer");
// Upload File
const path = require("path");

//Setting storage engine
const fs = require("fs");
const storageEngine = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log(file);
        // Ensure temp folder exists
        const tempDir = `./reports/ltb/temp/`;
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }
        cb(null, tempDir);
    },
    filename: (req, file, cb) => {
        // Use original filename or timestamped filename temporarily
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});

//initializing multer
const uploadFileReport = multer({
    storage: storageEngine,
    limits: { fileSize: 50000000 }, // 50 MB Max
});

module.exports = uploadFileReport;