const express = require('express');
const bodyParser = require('body-parser');// for parsing data from one page to another page
const mongoose = require('mongoose');

const HttpError = require('./models/error');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Handle CORS error for SPA connection when accessing from browser
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accecpt, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

//accessing routes
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);


//unsupported routes
app.use((req, res, next) => {
    throw new HttpError('Oops! Could not found this page.', 404);
});

//error handling middleware
app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred !' });
});

mongoose.connect('mongodb+srv://badsha:Goku1234@cluster0-czr76.mongodb.net/studybuddy?retryWrites=true&w=majority')
    .then(result => {
        app.listen(5000);
    })
    .catch(err => {
        console.log(err);
    });