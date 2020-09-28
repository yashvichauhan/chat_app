const path = require('path')
const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const {messageDetail} = require('./utils/messages')

const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 3000
const io = socketio(server)
const publicDIR = path.join(__dirname,'../public')
const {addUser,removeUser,getUser} = require('./utils/users')

app.use(express.static(publicDIR))
//io
io.on('connection',(socket)=>{
    //built in 
    console.log("Connected to client")
    //join chat room
    socket.on('joinPage',({username,room},callback)=>{
        const {error,user} = addUser({id:socket.id ,username:username,room:room})
        if(error){
            return callback(error)
        }
        socket.join(user.room)
        //when client joins every other clients gets this message
        socket.broadcast.to(user.room).emit('message',messageDetail("Admin",`${user.username} has joined the chat room.`))

        callback()
    })
    
    //message sending 
    socket.on('send-msg',(userObj,msg,callback)=>{
        io.to(userObj.room).emit('message',messageDetail(userObj.username,msg))
        callback()
    })
    //disconnecting users
    socket.on('disconnect',()=>{
        const user= removeUser(socket.id)
        if(user){
            io.to(user.room).emit('message',messageDetail("Admin",`${user.username} has left the chat room.`))
        }
    })
})
server.listen(port,()=>{
    console.log("App is runnning on port "+port)
})
