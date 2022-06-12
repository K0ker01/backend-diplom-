const Router = require ('express')
const router = new Router()
const powerController = require('../controllers/powerController')
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/', /**checkRole('ADMIN'),*/ powerController.create)
router.get('/', powerController.getAll)
router.get('/:id', powerController.getOne)
router.delete('/:id',/**checkRole('ADMIN'),*/ powerController.destroy)
router.put('/:id',/**checkRole('ADMIN'),*/ powerController.update)

module.exports = router
