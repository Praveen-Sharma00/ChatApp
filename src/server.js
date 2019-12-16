import app from './app'
import http from 'http'

let server  = http.createServer(app)
const socketio = require('socket.io')
const io=socketio(server)
io.on('connection',(socket)=>{
    // socket.on('user_connected',(data)=>{
    //     console.log(data + " is online! ")
    //     socket.join("fun")
    // })
    // socket.on("new_msg",(text)=>{
    //     socket.broadcast.to("fun").emit("new_msg",text)
    // })
    socket.on('join',(data)=>{
        console.log(data.name + " is Online !")
        socket.join("fun")
    })
    socket.on("new_msg",(data)=>{
        socket.broadcast.to("fun").emit('new_msg',data)
    })
})
server.listen(process.env.PORT,()=>{
    console.log(success('Server running on PORT '+process.env.PORT))
})