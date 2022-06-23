const jwt = require('jsonwebtoken')
const constants = require('../utils/constants')

module.exports.verifyAuth = (token) => {
    let decodedToken;

    try {
        decodedToken = jwt.verify(token, constants.secret);
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }

    if (!decodedToken) {
        const err = new Error('You are not logged in!');
        err.statusCode = 404;
        throw err;
    }
}