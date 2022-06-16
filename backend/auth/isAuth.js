const jwt = require('jsonwebtoken')

module.exports.verifyAuth = (token) => {
    let decodedToken;

    try {
        decodedToken = jwt.verify(token, 'ana_are_mere');
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