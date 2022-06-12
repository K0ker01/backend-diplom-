const Router = require('express')
const router = new Router()
const deviceRouter = require('./deviceRouter')
const userRouter = require('./userRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')
const powerRouter = require('./powerRouter')
const inventorRouter = require('./inventorRouter')


router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)
router.use('/power', powerRouter)
router.use('/inventor', inventorRouter)

module.exports = router
