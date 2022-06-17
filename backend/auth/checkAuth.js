var { verifyAuth } = require('../auth/isAuth')

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