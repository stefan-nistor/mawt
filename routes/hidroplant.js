const hidroplantController = require('../controller/hidroplantController')
const { Router } = require('../utils/Router')

var router = new Router()

router.get('', hidroplantController.getAll)
router.post('', hidroplantController.createHidroplant)
router.put('/:id', hidroplantController.updateHidroplant)
router.delete('/:id', hidroplantController.deleteHidroplant)
router.get('/name', hidroplantController.getByName)

module.exports = router