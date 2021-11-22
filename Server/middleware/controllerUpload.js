const multer = require('multer');
const path = require('path');

module.exports = {
    uploadFile: (req, res, next) => {
        console.log(req.query);
        const storage = multer.diskStorage({
            destination: `./upload/${req.query.folder}`,
            // destination: function(req, file, cb) {
            //     cb(null, `./upload/${req.query.folder}`);
            // },

            // // By default, multer removes file extensions so let's add them back
            filename: function(req, file, cb) {
                console.log(new Date().toISOString());
                cb(null, req.query.nameFile + '-' + new Date().toISOString().split('T')[0] + path.extname(file.originalname));
            }
        });

        // Files name is inside functions single
        let upload = multer({ storage: storage, limits: 20 * 1024 * 1024}).single('file');
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
                // let q = `UPDATE tb_error_log_2 set fimage `
                // dbMultiQuery()
                // Display uploaded image for user validation
                res.status(201).json({
                    message: 'Success',
                    path: req.file.destination + `/${req.file.filename}` 
                })
                
                // res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
            });
    }
}