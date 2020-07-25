const express = require('express');

const authController = require('../controllers/authController');
const fileUpload = require('../middleware/file-upload');

const authRoutes = express.Router();

//authentication/registration => POST
authRoutes.post('/registration', authController.postAddUser);

module.exports = authRoutes;