import app from './app'
import http from 'http'

let server  = http.createServer(app)

const io = require('socket.io')(server)
io.on('connection',(socket)=>{
    console.log('Someone connected')
    socket.on('user_connected',(user)=>{
        console.log(user.name + " is connected")
    })
    socket.on('new_message',(user,text)=>{
        console.log(user._id)
        console.log(text)
    })
})
server.listen(process.env.PORT,()=>{
    console.log(success('Server running on PORT '+process.env.PORT))
})