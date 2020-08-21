const HttpError = require('../models/error');
const User = require('../models/user');
const ResetPassword = require('../models/resetPassword');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mailUtil = require('../util/mail');

// Function to add user/reset password of an existing user
exports.postAddUser = (req, res, next) => {
    const { type } = req.body;
    
    User.findOne({ email: req.body.email })
        .then(async result => {
            let hashedPassword;
            try {
                hashedPassword = await bcrypt.hash(req.body.password, 12);
            } catch (err) {
                console.log(err);
            }
            if (result) {
                if (type === 'register') {
                    return next(new HttpError('Email is already registered', 409));
                } else if (type === 'resetPassword') {
                    User.updateOne({ email: req.body.email }, { $set: { password: hashedPassword } })
                        .then(result => {
                            res.json({ message: "Password updated successfully." });
                        })
                        .catch(err => {
                            return next(new HttpError('An unknown error occurred ! Please check after sometime...', 404));
                        })
                }
            } else {
                const user = new User({
                    userName: req.body.firstName + Math.random().toString(36).substr(3, 6),  // autogenerating username
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: hashedPassword
                });

                // To get data at util -> mail.js
                let mail = {
                    subject: 'Registration Successful !',
                    html: 'Dear ' + user.firstName.toUpperCase()
                        + ',<br/><br/>Your profile has been registered successfully. Your username is '
                        + user.userName.bold()
                        + '. Please keep it safe and secure. <br/><br/><br/> Warm Regards, <br/> Team Study4Buddy'
                };
                user.save()
                    .then(result => {
                        mailUtil.sendMail(user, mail);
                        res.json({ message: "Registered successfully." });
                    })
                    .catch(err => {
                        return next(new HttpError('An unknown error occurred ! Please check after sometime...', 404));
                    });
            }
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
                let imagePath = result.avatar;
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
                        return next(new HttpError('Could not log you in. Please try after sometime', 401));
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

// Function to get authenticated email and post values at forgot password model
exports.postVerifyEmail = (req, res, next) => {
    const email = req.body.email;
    User.findOne({ email: email })
        .then(user => {
            if (user) {
                otp = Math.random().toString().substr(3, 6);
                // To get data at util -> mail.js
                let mail = {
                    subject: 'Reset Password',
                    html: 'Dear ' + user.firstName.toUpperCase()
                        + ',<br/><br/>Please verify the OTP. Your OTP is '
                        + otp.bold()
                        + '. Your OTP will expire in 5 minutes. <br/><br/><br/> Warm Regards, <br/> Team Study4Buddy'
                };
                const resetPassword = new ResetPassword({
                    email: email,
                    otp: otp,
                    expiresIn: new Date().getTime() + (1000 * 60 * 5)
                });
                resetPassword.save()
                    .then(result => {
                        mailUtil.sendMail(user, mail);
                        res.json({ message: "OTP has been sent to your registered email." });
                    })
                    .catch(err => {
                        return next(new HttpError('Unable to set OTP', 401));
                    })

            } else {
                return next(new HttpError('Email is not registered', 401));
            }
        })
        .catch(err => {
            return next(new HttpError('An unknown error occurred ! Please check after sometime...', 500));
        })
}

// Function to get authenticated otp and timing
exports.getVerifyOtp = (req, res, next) => {
    const { email, otp } = req.query;
    ResetPassword.findOne({ email: email, otp: otp })
        .then(data => {
            if (data) {
                const currentTime = new Date().getTime();
                if (currentTime <= data.expiresIn) {
                    res.json({ message: "OTP verified successfully" });
                } else {
                    return next(new HttpError('OTP expired', 400));
                }
            } else {
                return next(new HttpError('Invalid OTP', 401));
            }
        })
        .catch(err => {
            return next(new HttpError('An unknown error occurred ! Please check after sometime...', 500));
        })
}