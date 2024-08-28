const jwt = require('jsonwebtoken');
const User = require("../models/user");
const ErrorResponse = require('../utils/errorResponse');

exports.isAuthenticated = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return next(new ErrorResponse('You must log in to access this resource', 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        if (!req.user) {
            return next(new ErrorResponse('User not found', 404));
        }
        next();
    } catch (error) {
        return next(new ErrorResponse('You must log in to access this resource', 401));
    }
};

exports.isAdmin = (req, res, next) => {
    if (req.user.role !== 1) {
        return next(new ErrorResponse('Access denied, you must be an admin', 401));
    }
    next();
};
