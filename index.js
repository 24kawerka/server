require('dotenv').config()
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const express = require('express')
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
const PORT = process.env.PORT || 5000
app.use(cors())
app.use(express.json())
app.use('/api', router)
//lastMiddleware
app.use(errorHandler)

io.on('connection', (socket) => {
    socket.on('newUser', () => {
        io.emit('newUserRegister')
    })
    socket.on('deleteTask', (data) => {
        io.emit('deleteTaskNotify', data)
    })
    socket.on('createTask', (createdItem) => {
        io.emit('createTaskNotify', createdItem)
    })
    socket.on('changeTask', (newTask) => {
        io.emit('changeTaskNotify', newTask)
    })
    socket.on('doneTask', (newTaskId) => {
        io.emit('doneTaskNotify', newTaskId)
    })
    socket.on('changeFirstName', (id) => {
        io.emit('changeFirstNameNotify', id)
    })
    socket.on('changeLastName', (id) => {
        io.emit('changeLastNameNotify', id)
    })

})


const start = async () => {
    await sequelize.authenticate()
    await sequelize.sync()
    server.listen(PORT, () => console.log(`Server start ${PORT}`))
}


start()
