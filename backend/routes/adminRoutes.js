const express = require('express');

const adminController = require('../controllers/adminController');
const fileUpload = require('../middleware/file-upload');

const adminRoutes = express.Router();

//admin/subjects => GET
adminRoutes.get('/subjects', adminController.getSubjects);

//admin/add-note => POST
adminRoutes.post('/add-note', fileUpload.single('file'), adminController.postAddNote);

//admin/deletenote/ => POST
adminRoutes.delete('/deletenote', adminController.deleteNote);

module.exports = adminRoutes;