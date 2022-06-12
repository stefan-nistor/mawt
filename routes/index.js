const { Router } = require('../utils/Router')
const user = require('./user')
const auth = require('./auth')

var router = new Router()

router.use('/auth', auth)

router.use('/users', user)

module.exports.index = router