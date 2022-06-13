const userController = require('../controller/userController')
const { Router } = require('../utils/Router')

const router = new Router()

router.get('', userController.getAll)
router.post('', userController.postMethod)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

module.exports = router