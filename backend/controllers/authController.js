const HttpError = require('../models/error');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Function to add users after clicking sign up button
exports.postAddUser = (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    User.findOne({ email: email })
        .then(async result => {
            if (result) {
                return next(new HttpError('Email is already registered', 409));
            }
            let hashedPassword;
            try {
                hashedPassword = await bcrypt.hash(password, 12);
            } catch (err) {
                console.log(err);
            }

            const user = new User({
                userName: firstName + Math.random().toString(36).slice(7),  // autogenerating username
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashedPassword
            });
            user.save()
                .then(result => {
                    res.json({ message: "Registered successfully." })
                })
                .catch(err => {
                    return next(new HttpError('An unknown error occurred ! Please check after sometime...', 404));
                });

        })
        .catch(err => {
            return next(new HttpError('An unknown error occurred ! Please check after sometime...', 404));
        });
}

// Function to get authenticated user after clicking sign in button
exports.getAuthUser = (req, res, next) => {
    const { email, password } = req.query;

    User.findOne({ email: email })
        .then(async result => {
            if (result) {
                let existingPassword = result.password;
                let { userName, email, firstName, lastName, isAdmin, college, stream, course, phoneNo } = result;
                let imagePath = result.avatar.path;
                let isValidPassword;
                try {
                    isValidPassword = await bcrypt.compare(password, existingPassword);
                } catch (err) {
                    console.log(err);
                }
                if (isValidPassword) {
                    let token;
                    try {
                        token = jwt.sign(
                            { userName: userName, email: email },
                            process.env.JWT_TOKEN,
                            { expiresIn: '1h' }
                        );
                    } catch (err) {
                        return next(new HttpError('Could not log you in...Please try after sometime', 401));
                    }

                    res.json(
                        {
                            result:
                            {
                                userName: userName,
                                email: email,
                                firstName: firstName,
                                lastName: lastName,
                                isAdmin: isAdmin,
                                college: college,
                                stream: stream,
                                course: course,
                                phoneNo: phoneNo,
                                imagePath: imagePath,
                                token: token
                            }
                        });
                } else {
                    return next(new HttpError('Invalid password', 401));
                }
            } else {
                return next(new HttpError('Email is not registered', 401));
            }
        })
        .catch(err => {
            return next(new HttpError('An unknown error occurred ! Please check after sometime...', 500));
        });

}