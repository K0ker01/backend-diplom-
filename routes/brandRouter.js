const Router = require ('express')
const router = new Router()
const brandController = require('../controllers/brandController')



router.post('/',/**checkRole('ADMIN'),*/ brandController.create)
router.get('/', brandController.getAll)
router.get('/:id', brandController.getOne)
router.delete('/:id',/**checkRole('ADMIN'),*/ brandController.destroy)
router.put('/:id',/**checkRole('ADMIN'),*/ brandController.update)

module.exports = router
