const HttpError = require('../models/error');
const User = require('../models/user');

// Function to add users after clicking sign up button
exports.postAddUser = (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    const user = new User({
        userName: firstName + Math.random().toString(36).slice(7),  // autogenerating username
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    });
    user.save()
        .then(result => {
            res.json({ message: "Registered successfully." })
        })
        .catch(err => {
            return next(new HttpError('An unknown error occurred ! Please check after sometime...', 404));
        });
}

// Function to get authenticated user after clicking sign in button
exports.getAuthUser = (req, res, next) => {
    const { email, password } = req.query;
    console.log(email);
    console.log(password);

    User.findOne({ $and: [{ email: email }, { password: password }] })
        .then(result => {
            console.log(result);
            res.json({ result });
        })
        .catch(err => {
            console.log(err);
            return next(new HttpError('Email is not registered', 401));
        });

}