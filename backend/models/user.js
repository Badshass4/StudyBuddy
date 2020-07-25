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
        type: String
    },
    password: {
        type: String,
        required: true
    },
    course: {
        type: String
    },
    stream: {
        type: String
    },
    college: {
        type: String
    },
    avatar: {
        type: Object
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', userSchema);