const nodemailer = require('nodemailer');


exports.sendMail = () => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: 'study4buddy420@gmail.com',
            pass: 'Admin@123'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: 'study4buddy420@gmail.com',
        to: 'badsha1695@gmail.com',
        subject: 'Registration',
        text: 'That was easy!'
    };

    console.log(mailOptions);

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

