const { Task, User } = require('../models/models')
// const { json } = require('sequelize/types/');


class TaskController {
    async create(req, res, next) {
        const { title, isDone } = req.body
        const task = await Task.create({ title, isDone, userId: req.user.id, })
        return res.json(task)

    }
    async getUserTasks(req, res) {
        const tasks = await Task.findAll({ where: { userId: req.user.id } })
        return res.json(tasks)
    }
    async deleteUserTask(req, res) {
        const { id } = req.params
        const task = await Task.destroy({ where: { id: id } })
        return res.json(task)

    }
    async tasksForAdmin(req, res) {
        const { id } = req.params
        const tasks = await Task.findAll({ where: { userId: id } })
        return res.json(tasks)
    }
    async changeTask(req, res) {
        const { id } = req.params
        const { title, isDone } = req.body
        const task = await Task.findOne({ where: { id: id } })
        const updatedTask = await task.update({ title: title, isDone: isDone })
        return res.json(updatedTask)
    }
    async doneTask(req, res) {
            const { id } = req.params
            const task = await Task.findOne({ where: { id: id } })
            const updatedTask = await task.update({ isDone: true })
            return res.json(updatedTask)
    }
}
module.exports = new TaskController() 