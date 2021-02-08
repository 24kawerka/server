const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const taskRouter = require('./taskRouter')
const authMiddleware = require('../middleware/authMiddleware')

router.use('/user', userRouter)
router.use('/task', authMiddleware, taskRouter)




module.exports = router