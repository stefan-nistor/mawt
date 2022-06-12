const { Router } = require('../utils/Router')
const authController = require('../controller/authController')

var router = new Router()

router.get('', (req, res) => {
    res.writeHead(200, {})
    res.write('Service is up')
    res.end()
})

router.post('/login', authController.login)
router.post('/register', authController.register)

module.exports = router