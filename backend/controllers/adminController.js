const httpError = require('../models/error');

const Subject = require('../models/subject');

// Function to go to add note page and fetching all subjects from subjects collection
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
            console.log(err);
        });
};

// Function to add notes after clicking add button
// exports.postAddNote = (req, res, next) => {

// };