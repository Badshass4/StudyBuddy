const express = require('express');

const userController = require('../controllers/userController');

const userRoutes = express.Router();

//user/notes/:subname => GET
userRoutes.get('/notes/:subname', userController.searchSubject);

module.exports = userRoutes;