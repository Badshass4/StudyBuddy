const express = require('express');

const adminController = require('../controllers/adminController');

const adminRoutes = express.Router();

//admin/subjects => GET
adminRoutes.get('/subjects', adminController.getSubjects);

//admin/add-note => POST
// adminRoutes.post('/add-note', adminController.postAddNote);

module.exports = adminRoutes;