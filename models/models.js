const sequelize = require('../db')
const { DataTypes, Sequelize } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
    firstName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
    isOnline: { type: DataTypes.BOOLEAN }
})
const Task = sequelize.define('task', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    isDone: { type: DataTypes.BOOLEAN },
    userId: { type: DataTypes.INTEGER}
})
User.hasMany(Task);
Task.belongsTo(User)

module.exports = {
    User, Task
}