const Router = require ('express')
const router = new Router()
const inventorController = require('../controllers/inventorController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), inventorController.create)
router.delete('/:id',checkRole('ADMIN'), inventorController.destroy)

module.exports = router