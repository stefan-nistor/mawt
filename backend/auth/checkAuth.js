var { verifyAuth } = require('../auth/isAuth')
const jwtDecode = require('jwt-decode')
require('dotenv').config()

module.exports.checkAuth = (req, res) => {
    if (!req.headers.authorization) {
        res.statusCode = 401
        res.setHeader('Content-Type', 'application/json')
        res.write(JSON.stringify({ success: false, message: 'no token' }))
        res.end()
        return false
    }
    const token = req.headers.authorization.split(' ')[1];
    try {
        verifyAuth(token)
        return true
    } catch (err) {
        res.statusCode = 401
        res.setHeader('Content-Type', 'application/json')
        res.write(JSON.stringify({ success: false, message: 'invalid token' }))
        res.end()
        return false
    }
}

module.exports.checkIfAdmin = async(req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const userFromToken = await jwtDecode(token)

        if (userFromToken.email === process.env.MAILING_ACC_EMAIL) {
            return true
        } else {
            res.statusCode = 404
            res.setHeader('Content-type', 'application/json')
            res.write(JSON.stringify({ success: false, message: 'user is not admin' }))
            res.end()
            return false
        }
    } catch (e) {
        console.log(e)
        res.statusCode = 500
        res.setHeader('Content-type', 'application/json')
        res.write(JSON.stringify({ success: false, message: 'Internal Server error!' }))
        res.end()
        return false
    }
}