const multer = require("multer");

const path = require("path");

//Setting storage engine
const storageEngine = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log(file);
        cb(null, `./reports/ltb/${req.body.fid}_${req.body.problem}/`);
    },
    filename: (req, file, cb) => {
        cb(null, `${req.body.problem}.xlsx`);
    },
});

//initializing multer
const uploadFileReport = multer({
    storage: storageEngine,
    limits: { fileSize: 50000000 }, // 50 MB Max
});

module.exports = uploadFileReport;