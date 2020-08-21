const express = require('express');

const authController = require('../controllers/authController');
const fileUpload = require('../middleware/file-upload');

const authRoutes = express.Router();

//authentication/registration => POST
authRoutes.post('/registration', authController.postAddUser);

//authentication/login => GET
authRoutes.get('/login', authController.getAuthUser);

//authentication/verify-email => POST
authRoutes.post('/verify-email', authController.postVerifyEmail);

//authentication/verify-otp => POST
authRoutes.get('/verify-otp', authController.getVerifyOtp);

module.exports = authRoutes;