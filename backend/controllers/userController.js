const HttpError = require('../models/error');
const StudyMaterial = require('../models/studyMaterial');
const Course = require('../models/course');
const Subject = require('../models/subject');

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
            res.json({ result: { stream: data.stream, duration: data.duration } });
        })
        .catch(err => {
            console.log(err);
            return next(new HttpError('Oops ! You have chosen wrong course', 404));
        })
}

exports.getSubjects = (req, res, next) => {
    const { course, year } = req.query;
    const streamId = req.query.stream;

    Course.findOne({ _id: course },
        { _id: 0, name: 1, stream: 1 })
        .then(courseData => {
            const courseName = courseData.name;
            let streamName = "";

            if (streamId !== null) {
                const streamObj = courseData.stream.filter(s => {
                    if (s._id.toString() === streamId) {
                        return s;
                    };
                });
                streamName = streamObj[0].title;
            }

            Subject.find({
                "courseDetails": {
                    $elemMatch: {
                        "courseName": courseName,
                        "streamName": streamName,
                        "year": year.toString()
                    }
                }
            }, { subjectName: 1 })
                .then(result => {
                    res.json({ result });
                })
                .catch(err => {
                    console.log("Error in getting subjects of a given set of course details");
                    console.log(err);
                    return next(new HttpError('Oops ! No Subjects available', 404));
                });
        })
        .catch(err => {
            console.log("Error in getting course details");
            console.log(err);
            return next(new HttpError('Server timed out', 404));
        })
}