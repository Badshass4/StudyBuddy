const express = require('express');
const bodyParser = require('body-parser');// for parsing data from one page to another page
const mongoose = require('mongoose');

const httpError = require('./models/error');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

app.use(bodyParser.json());

//accessing routes
app.use('/admin', adminRoutes);


//unsupported routes
app.use((req, res, next) => {
    const error = new Error('Could not found this page', 404);
    return next(error);
});

//error handling middleware
app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occured !' });
});

mongoose.connect('mongodb+srv://badsha:Goku1234@cluster0-czr76.mongodb.net/studybuddy?retryWrites=true&w=majority')
    .then(result => {
        app.listen(5000);
    })
    .catch(err => {
        console.log(err);
    });
