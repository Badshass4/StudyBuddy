const HttpError = require('../models/error');
const StudyMaterial = require('../models/studyMaterial');
const Course = require('../models/course');

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

exports.getCourses = (req, res, next) => {
    Course.find({},
        { name: 1 })
        .then(result => {
            res.json({ result });
        })
        .catch(err => {
            return next(new HttpError('No courses available', 404));
        })
};

exports.getStreams = (req, res, next) => {
    const courseId = req.params.courseId;
    Course.findById(courseId)
        .then(data => {
            res.json({result: {stream: data.stream, duration: data.duration}});
        })
        .catch(err => {
            console.log(err);
            return next(new HttpError('Oops ! You have chosen wrong course', 404));
        })
}