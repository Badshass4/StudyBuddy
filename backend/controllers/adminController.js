const fs = require('fs');
const HttpError = require('../models/error');
const Subject = require('../models/subject');
const StudyMaterial = require('../models/studyMaterial');
const studyMaterial = require('../models/studyMaterial');

// Function to fetch all subjects from subjects collection and return it to admin/addnote page
exports.getSubjects = (req, res, next) => {
    Subject.find()
        .then(result => {
            let allSubject = [];
            newResult = [...result];
            newResult.map(r => {
                if (!allSubject.includes({ id: r.subjectId, label: r.subjectName })) {
                    allSubject.push({ id: r.subjectId, label: r.subjectName });
                }
            });
            allSubject.sort();
            res.json({ allSubject });
        })
        .catch(err => {
            return next(new HttpError('An unknown error occurred ! Please check after sometime...', 404));
        });
};

// Function to add notes after clicking add button
exports.postAddNote = (req, res, next) => {
    const { title, subject } = req.body;
    const file = req.file;
    const studyMaterial = new StudyMaterial({
        title: title,
        subject: subject,
        file: file
    });
    studyMaterial.save()
        .then(result => {
            res.json({ message: "File has been uploaded successfully." })
        })
        .catch(err => {
            return next(new HttpError('An unknown error occurred ! Please check after sometime...', 404));
        });
};


// Function to edit note details excluding file
exports.putEditNote = (req, res, next) => {
    const { noteId, title, subject } = req.body;
    StudyMaterial.findById(noteId)
        .then(result => {
            StudyMaterial.updateOne({ _id: result._id },
                { $set: { title: title, subject: subject } })
                .then(() => {
                    res.json({ message: 'File has been edited successfully' })
                })
                .catch(err => {
                    return next(new HttpError('An unknown error occurred ! Please check after sometime...', 404));
                });
        })
        .catch(err => {
            return next(new HttpError('Oops ! Could not find specified material', 404));
        })
}

// Function to delete notes
exports.deleteNote = (req, res, next) => {
    const noteId = req.query.noteId;

    studyMaterial.findByIdAndRemove(noteId)
        .then(result => {
            const filePath = result.file.path;
            fs.unlink(filePath, err => {
                err !== null ? console.log(err) : console.log('Deleted Successfully !')
            })
            res.json({ message: 'Your file has been deleted successfully !' });
        })
        .catch(err => {
            console.log(err);
            return next(new HttpError('An unknown error occurred ! Please check after sometime...', 404));
        })
}