const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Task } = require('../models/models')
const jwt_decode = require('jwt-decode')


const generateJWT = (email, firstName, lastName, id, role) => {
    return jwt.sign(
        { firstName, lastName, id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}

class UserController {
    async registration(req, res, next) {
        const { email, password, firstName, lastName, role } = req.body
        if (!email || !password || !firstName || !lastName) {
            return next(ApiError.badRequest('Некорректные данные'))
        }
        const candidate = await User.findOne({ where: { email } })
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({ email, password: hashPassword, firstName, lastName, role })
        const token = generateJWT(user.email, user.firstName, user.lastName, user.id, user.role)
        return res.json({ token })
    }


    async login(req, res, next) {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email } })
        if (user.isOnline === false) {
            return next(ApiError.internal('Пользователь неактивен, создайте новый аккаунт!'))
        }
        if (!user) {
            return next(ApiError.internal('Пользователь не найден!'))
        }
        //verify input password and password DB
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJWT(user.email, user.firstName, user.lastName, user.id, user.role)
        return res.json({ token })
    }
    async getAllUsers(req, res) {
        const users = await User.findAll()
        return res.json(users)
    }
    async changeFirstName(req, res) {
        const { id } = req.params
        const { firstName } = req.body
        const user = await User.findOne({ where: { id: id } })
        const updatedFirstName = await user.update({ firstName: firstName })
        return res.json(updatedFirstName)

    }
    async changeLastName(req, res) {
        const { id } = req.params
        const { lastName } = req.body
        const user = await User.findOne({ where: { id: id } })
        const updatedLastName = await user.update({ lastName: lastName })
        return res.json(updatedLastName)
    }
    async deleteUser(req, res) {
        const { id } = req.params
        const task = await User.destroy({ where: { id: id } })
        return res.json(task)
    }

    //must be isActive but will be isOnline...
    async changeIsActive(req, res) {
        const { id } = req.params
        const user = await User.findOne({ where: { id: id } })
        if (user.isOnline === true) {
            const updatedLastName = await user.update({ isOnline: false })
            return res.json(updatedLastName)
        } else {
            const updatedLastName = await user.update({ isOnline: true })
            return res.json(updatedLastName)
        }
    }
}
module.exports = new UserController()