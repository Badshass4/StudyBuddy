const HttpError = require('../models/error');
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token === undefined) return next(new HttpError('No Token', 401));

    jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
        if (err) return next(new HttpError('Unauthorized Access Denied !', 403));
        next();
    })
}

module.exports = authenticateToken;