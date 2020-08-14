const express = require('express');

const adminController = require('../controllers/adminController');
const fileUpload = require('../middleware/file-upload');
const authToken = require('../middleware/authenticateToken');

const adminRoutes = express.Router();

//admin/subjects => GET
adminRoutes.get('/subjects', adminController.getSubjects);

//admin/add-note => POST
adminRoutes.post('/add-note', authToken, fileUpload.single('file'), adminController.postAddNote);

//admin/edit-note => PUT
adminRoutes.put('/edit-note', adminController.putEditNote);

//admin/deletenote/ => DELETE
adminRoutes.delete('/deletenote', adminController.deleteNote);

module.exports = adminRoutes;