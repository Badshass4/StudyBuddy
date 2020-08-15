const express = require('express');

const userController = require('../controllers/userController');
const {imageUpload} = require('../middleware/file-upload');
const authToken = require('../middleware/authenticateToken');

const userRoutes = express.Router();

//user/notes/:subname => GET
userRoutes.get('/notes/:subname', userController.searchSubject);

//user/courses => GET
userRoutes.get('/courses', userController.getCourses);

//user/stream/:courseId => GET
userRoutes.get('/stream/:courseId', userController.getStreams);

//user/subject => GET
userRoutes.get('/subject', userController.getSubjects);

//user/downloadnote => GET
userRoutes.get('/downloadnote', userController.downloadNote);

//user/profile-image => GET
userRoutes.post('/profile-image', authToken, imageUpload.single('file'),  userController.profileImage);

module.exports = userRoutes;
