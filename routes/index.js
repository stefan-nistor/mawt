const { Router } = require('../utils/Router')
const user = require('./user')

var router = new Router()

router.use('/users', user)

module.exports.index = router