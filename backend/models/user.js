const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: Object,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        required: true
    },
    course: {
        type: String,
        default: ''
    },
    stream: {
        type: String,
        default: ''
    },
    college: {
        type: String,
        default: ''
    },
    avatar: {
        type: Object,
        default: {}
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', userSchema);