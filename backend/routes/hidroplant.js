const hidroplantController = require('../controller/hidroplantController')
const { Router } = require('../utils/Router')

var router = new Router()

router.get('', hidroplantController.getAll)
router.post('', hidroplantController.createHidroplant)
router.put('/:id', hidroplantController.updateHidroplant)
router.delete('/:id', hidroplantController.deleteHidroplant)
router.get('/name', hidroplantController.getByName)
router.get('/top', hidroplantController.getTopNHidroplants)
router.get('/closest', hidroplantController.getClosestHidroplant)
router.get('/weather', hidroplantController.getChangesForWeather)
router.get('/rss', hidroplantController.getRssFeed)

module.exports = router