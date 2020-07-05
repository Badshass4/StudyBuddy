const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studyMaterialSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    file: {
        type: Object,
        required: true
    }
});

module.exports = mongoose.model('StudyMaterial', studyMaterialSchema);