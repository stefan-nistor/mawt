const { Router } = require('../utils/Router')
const user = require('./user')
const auth = require('./auth')
const hidroplant = require('./hidroplant')
const pwd = require('./reset-password')

var router = new Router()

router.use('/auth', auth)

router.use('/users', user)

router.use('/hidroplants', hidroplant)

router.use('/pwd', pwd)

module.exports.index = router