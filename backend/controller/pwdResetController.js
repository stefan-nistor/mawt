const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const constants = require('../utils/constants')
const crypto = require('crypto')
const nodemailer = require('nodemailer')

var secret;

module.exports.forgotPassword = async(req, res) => {
    try {
        secret = crypto.randomUUID()
        const user = await req.db.User.findOne({ email: req.body.email })
        if (!user) {
            res.statusCode = 401
            res.setHeader('Content-type', 'application/json')
            res.write(JSON.stringify({ success: false, message: 'no user for this email' }))
            res.end()
            return
        }

        const payload = {
            email: user.email,
            id: user._id,
        }

        const token = jwt.sign(payload, secret, { expiresIn: '30m' })
        const link = `http://127.0.0.1:5500/frontend/views/reset.html?token=${token}`

        const userUpdate = await req.db.User.updateOne({ _id: user._id }, { $set: { password_token: token } }, { upsert: true })

        const transporter = nodemailer.createTransport({
            host: 'smtp.outlook.com',
            port: 587,
            secure: false,
            auth: {
                user: 'mawt_system123@outlook.com',
                pass: 'Mawt_password1234'
            }
        })

        const info = await transporter.sendMail({
            from: '"Mawt mailing system" <mawt_system123@outlook.com>',
            to: user.email,
            subject: 'Reset password link',
            text: `Click the following link to reset your password: ${link}`
        })

        res.statusCode = 200
        res.setHeader('Content-type', 'application/json')
        res.write(JSON.stringify({ success: true, message: 'Password reset link has been sent to the email.' }))
        res.end()
    } catch (e) {
        console.log(e)
        res.statusCode = 500
        res.setHeader('Content-type', 'application/json')
        res.write(JSON.stringify({ success: false, message: 'Internal Server error!' }))
        res.end()
    }
}

const verifyResetPassword = (req, res) => {
    try {
        let arr = []
        arr = req.url.split('/')
        let token = arr[arr.length - 1]
        try {
            const payload = jwt.verify(token, secret)
            return true
        } catch (err) {
            res.statusCode = 401
            res.setHeader('Content-type', 'application/json')
            res.write(JSON.stringify({ success: false, message: 'invalid reset token' }))
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

module.exports.resetPassword = async(req, res) => {
    if (!verifyResetPassword(req, res)) {
        return
    }

    try {
        console.log(req)
        let arr = []
        arr = req.url.split('/')
        let token = arr[arr.length - 1]

        const userForToken = await req.db.User.findOne({ password_token: token })

        if (!userForToken) {
            res.statusCode = 401
            res.setHeader('Content-type', 'application/json')
            res.write(JSON.stringify({ success: false, message: 'invalid password token' }))
            res.end()
            return
        }

        const user = await req.db.User.findOne({ _id: userForToken._id })
        if (!user) {
            res.statusCode = 401
            res.setHeader('Content-type', 'application/json')
            res.write(JSON.stringify({ success: false, message: 'no user for this id' }))
            res.end()
            return
        }

        const userUpdate = await req.db.User.updateOne({ _id: userForToken._id }, {
            $set: {
                password_token: null,
                password: bcrypt.hashSync(req.body.password, constants.rounds)
            }
        }, { upsert: true })

        res.statusCode = 200
        res.setHeader('Content-type', 'application/json')
        res.write(JSON.stringify({ success: true, message: 'Password successfully reset.' }))
        res.end()

    } catch (e) {
        console.log(e)
        res.statusCode = 500
        res.setHeader('Content-type', 'application/json')
        res.write(JSON.stringify({ success: false, message: 'Internal Server error!' }))
        res.end()
    }
}