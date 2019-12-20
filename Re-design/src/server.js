import app from './app'
import http from 'http'

const server = http.createServer(app)
const socketio = require('socket.io')
const io = socketio(server)

io.on('connection',function (socket) {
    socket.on('login',(user)=>{
        console.log(user.name + " is Online !")
    })
    let roomName="";
    socket.on('join',(data)=>{
        if(data.type === "individual"){
            let a=data.sender._id
            let b=data.rec_id
            if(a>b)
                [a, b] = [b, a]
            roomName=a+","+b
        }else if(data.type === "group"){
            roomName=data.rec_id+""
        }
        socket.join(roomName)
    })
    socket.on('new_msg',(metadata)=>{
        let _room;
        let a=metadata.sender._id
        let b=metadata.receiver
        if(a>b)
            [a, b] = [b, a]
        if(metadata.type==="individual"){
            _room=a+","+b
        }else{
            _room=b+""
        }
        socket.broadcast.to(_room).emit('new_msg',{text:metadata.text})
    })
})
server.listen(process.env.PORT,()=>{
    console.log(success("Server listening on PORT "+process.env.PORT ))
})