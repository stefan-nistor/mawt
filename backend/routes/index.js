const { Router } = require('../utils/Router')
const user = require('./user')
const auth = require('./auth')
const hidroplant = require('./hidroplant')

var router = new Router()

router.use('/auth', auth)

router.use('/users', user)

router.use('/hidroplants', hidroplant)

module.exports.index = router