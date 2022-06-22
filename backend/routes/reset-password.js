const pwdResetController = require('../controller/pwdResetController')
const { Router } = require('../utils/Router')

const router = new Router()

router.post('/forgot-password', pwdResetController.forgotPassword)
router.post('/reset-password/:token', pwdResetController.resetPassword)

module.exports = router