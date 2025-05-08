const multer = require('multer');


function upload(req, cb) {
    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, 'uploads/');
        },
    
        // By default, multer removes file extensions so let's add them back
        filename: function(req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    });
    
    // Files name is inside functions singele
    let upload = multer({ storage: storage }).single('sampleFile');
    
        upload(req, res, function(err) {
            // req.file contains information of uploaded file
            // req.body contains information of text fields, if there were any
    
            if (req.fileValidationError) {
                return res.status(500).json({
                    message: 'Err',
                    err: req.fileValidationError
                })
            }
            else if (!req.file) {
                return res.status(500).json({
                    message: 'Err',
                    err: 'Please select File'
                })
            }
            else if (err instanceof multer.MulterError) {
                return res.send(err);
            }
            else if (err) {
                return res.send(err);
            }
    
            // Display uploaded image for user validation
            res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
            cb(req.file.path)
        });
}

module.exports = upload