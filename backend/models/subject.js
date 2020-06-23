const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    subjectId: {
        type: String,
        required: true
    },
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
                type: String,
                required: true
            },
            year: {
                type: Number,
                required: true
            }
        }
    ]
})

module.exports = mongoose.model('Subject', subjectSchema);