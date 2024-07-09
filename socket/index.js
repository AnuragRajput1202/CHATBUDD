const { Server } = require('socket.io')

const io = new Server(9000, {
    cors :{
        origin : 'https://chatbudd-client.onrender.com'
    }
})
let activeUsers =[]

const addUsers = (userId, socketId) =>{
    !activeUsers.some(user=>user===userId)&&activeUsers.push({userId, socketId})
}
const getUser = (userId) =>{
    const user= activeUsers.find(user=>user.userId===userId)
    return user
}

io.on('connection', (socket)=>{
    console.log('a user connected')

    socket.on('addUsers', userId=>{
        addUsers(userId, socket.id)
        io.emit('getUsers', activeUsers)
    })

    socket.on('sendMessage', msg=>{
        const user = getUser(msg.receiverId)
        if(user){
            io.to(user.socketId).emit('getMessage', msg)
        }
    })

    socket.on('removeUser', userId=>{
        activeUsers = activeUsers.filter(user=>user.userId!==userId)
        io.emit('loggedOutUser', activeUsers)
    })

    socket.on('sendTypingIndicator', data=>{
        const user = getUser(data.to)
        if(user){
            io.to(user.socketId).emit('getTypingIndicator', data)
        }
    })
})