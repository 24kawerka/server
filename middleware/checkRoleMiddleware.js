const jwt = require('jsonwebtoken')

module.exports = function (role) {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1] //token type, then token
            if (!token) {
                return res.status(401).json({ message: "Не авторизован" })
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if (decoded.role !== role) {
                return res.status(403).json({ message: "Нет доступа" })
            }
            req.user = decoded
            next()
        } catch (e) {
            const token = generateJwt(req.user.id, req.user.email, req.user.firstName, req.user.lastName, req.user.role)
            return res.json({ token })
        }
    }
}




