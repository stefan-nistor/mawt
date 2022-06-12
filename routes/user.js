const userController = require('../controller/userController')
const { Router } = require('../utils/Router')

const router = new Router()

router.get('', userController.getAll)
router.post('/', userController.postMethod)

module.exports = router