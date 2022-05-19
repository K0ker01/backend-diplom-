const Router = require ('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')

router.post('/',/**checkRole('ADMIN'),*/ deviceController.create)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)
router.delete('/:id',/**checkRole('ADMIN'),*/ deviceController.destroy)
router.put('/:id',/**checkRole('ADMIN'),*/ deviceController.update)

module.exports = router
