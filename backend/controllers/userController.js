const fs = require('fs');
// const path = require('path');
const HttpError = require('../models/error');
const User = require('../models/user');
const StudyMaterial = require('../models/studyMaterial');
const Course = require('../models/course');
const Subject = require('../models/subject');

// Function to search/get materials of any given subject name
exports.searchSubject = (req, res, next) => {
    const subjectName = req.params.subname;
    StudyMaterial.find({ $text: { $search: subjectName } },
        { title: 1, subject: 1, "file.originalname": 1 }
    )
        .then(result => {
            result.sort();
            if (result.length === 0) {
                return next(new HttpError('Please enter correct subject name.', 404));
            } else {
                let filteredSubjects = result.filter(r => {
                    return r.subject.toLowerCase() === subjectName.toLowerCase()
                });
                filteredSubjects.length > 0 ? res.json({ result: filteredSubjects }) : res.json({ result });
            }
        })
        .catch(err => {
            return next(new HttpError('Server timed out.', 404));
        });
};

// Function to get all the courses in side-drawer
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

// Function to get all the streams and years of a selected course
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

// Function to get subject lists of a particular combination of course, stream and year
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
                    return s._id.toString() === streamId
                });
                streamObj.length === 0 ? streamName = "" : streamName = streamObj[0].title;
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

// Function to download the notes after clicking download icon in studyaterial-card
exports.downloadNote = (req, res, next) => {
    const noteId = req.query.noteId;
    console.log(noteId);
    StudyMaterial.findOne({ _id: noteId },
        { file: 1 })
        .then(result => {
            const filePath = result.file.path;
            const fileName = result.file.originalname;
            // fs.readFile(filePath, (err, data) => {
            //     if (err){
            //         return next(new HttpError('Oops ! An unknown problem occur... Please click download again', 404));
            //     }
            //     res.setHeader('Content-Type', 'application/pdf');
            //     res.setHeader('Content-Disposition', 'attachment; filename="' + fileName + '"');
            //     res.send(data);
            //     res.json({message: 'message'})
            // })
            res.download(filePath, fileName);
        })
        .catch(err => {
            return next(new HttpError('Server timed out', 404));
        })
}

// Function to add profile picture
exports.profileImage = (req, res, next) => {
    const { userName } = req.body;
    const file = req.file;
    
    User.findOne({ userName: userName })
        .then(data => {
            if (data) {
                let prevFilePath = data.avatar;
                User.updateOne({userName: data.userName},{ $set: { avatar: file.path } })
                    .then(result => {
                        if (prevFilePath.length !== 0) {
                            fs.unlink(prevFilePath, err => {
                                (err !== null) ? console.log(err) : res.json({ filePath: file.path });
                            })
                        } else {
                            res.json({ filePath: file.path });
                        }

                    })
                    .catch(err => {
                        return next(new HttpError('Server timed out', 404));
                    })
            } else {
                return next(new HttpError('No such username !', 404));
            }
        })
        .catch(err => {
            return next(new HttpError('Failed to fetch user', 404));
        })
}

// Function to remove profile picture
exports.removeProfileImage = (req, res, next) => {
    const userName = req.query.userName;
    User.findOne({ userName: userName })
        .then(user => {
            let prevFilePath = user.avatar;
            if (user) {
                User.updateOne({userName: user.userName},{ $set: { avatar: '' } })
                    .then(result => {
                        fs.unlink(prevFilePath, err => {
                            err !== null ? console.log(err) : res.json({ message: "Profile picture removed successfully" })
                        })
                    });
            } else {
                return next(new HttpError('User not found', 404));
            }
        })
        .catch(err => {
            return next(new HttpError('Server timed out', 404));
        })
}

// Function to edit profile details
exports.editProfile = (req, res, next) => {
    const userDetails = req.body;
    User.updateOne({ userName: userDetails.userName },
        {
            $set: {
                firstName: userDetails.userFirstName,
                lastName: userDetails.userLastName,
                email: userDetails.userMail,
                phoneNo: userDetails.userPhoneNo,
                college: userDetails.userCollege,
                course: userDetails.userCourse,
                stream: userDetails.userStream
            }
        }
    )
        .then(result => {
            res.json({ message: "Profile updated successfully !" });
        })
        .catch(err => {
            return next(new HttpError('No such username !', 404));
        })
}