const express = require('express');

const userController = require('../controllers/userController');

const userRoutes = express.Router();

//user/notes/:subname => GET
userRoutes.get('/notes/:subname', userController.searchSubject);

//user/courses => GET
userRoutes.get('/courses', userController.getCourses);

//user/stream/:courseId => GET
userRoutes.get('/stream/:courseId', userController.getStreams);

module.exports = userRoutes;
