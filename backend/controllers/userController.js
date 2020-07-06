const HttpError = require('../models/error');
const StudyMaterial = require('../models/studyMaterial');

exports.searchSubject = (req, res, next) => {
    const subjectName = req.params.subname;
    StudyMaterial.find({ $text: { $search: subjectName } },
        { title: 1, subject: 1, "file.filename": 1, "file.path": 1 }
    )
        .then(result => {
            if (result.length === 0) {
                return next(new HttpError('Please enter correct subject name.', 404));
            } else {
                res.json({ result });
            }
        })
        .catch(err => {
            return next(new HttpError('Server timed out.', 404));
        });
};