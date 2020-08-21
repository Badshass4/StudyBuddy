const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const resetPasswordSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    expiresIn: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('ResetPassword', resetPasswordSchema);