const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/users', userController.getAllUsers)
router.put('/firstname/:id', userController.changeFirstName)
router.put('/lastname/:id', userController.changeLastName)
router.delete('/users/:id', userController.deleteUser)
router.put('/isactive/:id', userController.changeIsActive)
module.exports = router