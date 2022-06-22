const { Schema, model } = require('mongoose')

var userSchema = new Schema({
    email: String,
    password: String,
    password_token: String
})

module.exports = model('User', userSchema, 'User')