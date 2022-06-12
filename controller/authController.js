const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { builtinModules } = require('module')
const constants = require('../utils/constants')

module.exports.register = async (req, res) => {
    res.setHeader('Content-type', 'application/json')

    if(!req.body.email) {
        console.error('no email error')
        res.statusCode = 400
        res.write(JSON.stringify({ success: false, message: 'email is required' }))
        res.end()
        return
    }
    if(!req.body.password) {
        console.error('no password error')
        res.statusCode = 400
        res.write(JSON.stringify({ success: false, message: 'password is required' }))
        res.end()
        return
    }

    const user = await req.db.User.findOne({ email: req.body.email })
    if(user) {
        res.statusCode = 403
        res.write(JSON.stringify({ success: false, messageL: 'email has been taken' }))
        res.end()
    } else {
        const user_ = new req.db.User({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, constants.rounds)
        })
        console.log(user_)
        user_.save((err) => {
            if(err) {
                console.log(err)
                res.statusCode = 500
                res.write(JSON.stringify({ success: false, message: 'internal server error' }))
                res.end()
            } else {
                res.statusCode = 201
                res.write(JSON.stringify({ success: true, message: 'user created' }))
                res.end()
            }
        })
    }
}

module.exports.login = async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    
    if (!req.body.email) {
        console.error('no email error')
        res.statusCode = 400
        res.write(JSON.stringify({ success: false, message: 'email is required' }))
        res.end()
        return
    }
    if (!req.body.password) {
        console.error('no password error')
        res.statusCode = 400
        res.write(JSON.stringify({ success: false, message: 'password is required' }))
        res.end()
        return
    }

    req.db.User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            console.error(err)
            res.statusCode = 500
            res.write(JSON.stringify({ success: false, message: 'internal server error' }))
            res.end()
        }

        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.statusCode = 200
                const token = jwt.sign(req.body, constants.secret)
                res.setHeader('Authorization', 'Bearer ' + token)
                res.write(JSON.stringify({ success: true, message: 'login successful' }))
                res.end()
            } else {
                res.statusCode = 401
                res.write(JSON.stringify({ success: false, message: 'invalid credentials' }))
                res.end()
            }
        } else {
            res.statusCode = 401
            res.write(JSON.stringify({ success: false, message: 'invalid credentials' }))
            res.end()
        }
    })
}