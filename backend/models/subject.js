const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    subjectName: {
        type: String,
        required: true
    },
    courseDetails: [
        {
            courseName: {
                type: String,
                required: true
            },
            streamName: {
                type: String
            },
            year: {
                type: String,
                required: true
            }
        }
    ]
})

module.exports = mongoose.model('Subject', subjectSchema);