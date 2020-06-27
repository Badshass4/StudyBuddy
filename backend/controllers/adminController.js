const HttpError = require('../models/error');
const Subject = require('../models/subject');
const StudyMaterial = require('../models/studyMaterial');

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
            throw new HttpError('An unknown error occurred ! Please check after sometime...', 404);
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
            res.json({ message: "File has been saved successfully." })
        })
        .catch(err => {
            throw new HttpError('An unknown error occurred ! Please check after sometime...', 404);
        });
};