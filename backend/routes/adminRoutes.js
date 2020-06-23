const express = require('express');

const adminController = require('../controllers/adminController');

const adminRoutes = express.Router();

//admin/add-note => GET
adminRoutes.get('/add-note', adminController.getAddNote);

//admin/add-note => POST
// adminRoutes.post('/add-note', adminController.postAddNote);

module.exports = adminRoutes;