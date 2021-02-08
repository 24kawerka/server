const Router = require('express')
const router = new Router()
const taskController = require('../controllers/taskController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', taskController.create)
router.get('/', taskController.getUserTasks)
router.delete('/:id', taskController.deleteUserTask)
router.get('/tasksforadmin/:id', taskController.tasksForAdmin)
router.put('/:id', taskController.changeTask)
router.put('/done/:id', taskController.doneTask)

module.exports = router