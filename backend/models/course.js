const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    stream: [{
        title: {
            type: String,
            required: true
        }
    }],
    duration: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Course', courseSchema);
