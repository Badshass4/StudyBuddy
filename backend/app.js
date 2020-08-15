const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');// for parsing data from one page to another page
const mongoose = require('mongoose');

const HttpError = require('./models/error');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

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

app.use(express.static(path.join(__dirname, 'uploads')));

//accessing routes
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/authentication', authRoutes);


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

mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0-czr76.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`)
    .then(result => {
        app.listen(process.env.PORT || 5000);
    })
    .catch(err => {
        console.log(err);
    });
