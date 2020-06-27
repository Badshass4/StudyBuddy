const multer = require('multer');
const uuid = require('uuid');

//Accepting only these types of files
const MIME_TYPE_MAP = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png',
    'application/pdf': 'pdf'
};
const fileUpload = multer({
    limits: 1024 * 1024 * 10,    // File size 10 MB only
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/files');
        },
        filename: (req, file, cb) => {
            const extn = MIME_TYPE_MAP[file.mimetype];
            cb(null, uuid.v1() + '.' + extn);
        }
    }),
    fileFilter: (req, file, cb) => {
        const isValid = !!MIME_TYPE_MAP[file.mimetype];
        let error = isValid ? null : new Error('Invalid file type!');
        cb(error, isValid);
    }
});

module.exports = fileUpload;