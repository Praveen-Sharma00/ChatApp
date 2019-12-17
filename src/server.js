import app from './app'
import http from 'http'
import {userController} from "./controllers/user";


let server = http.createServer(app)
const socketio = require('socket.io')
const io = socketio(server)

const singleChat = io.of('/chat');
singleChat.on('connection', function (singleSocket) {
    let roomName;
    console.log('Someone connected');
    singleSocket.on('join', (data) => {
        roomName = data.a + " " + data.b
        singleSocket.join(roomName)
    })
    singleSocket.on("new_msg", async (msg) => {
        console.log(msg)
        let response = await userController.updateIndividualMessages(msg.senderName, msg.senderID, msg.receiverID, msg.text, 1)
        if (response) {
            console.log('Done')
            singleSocket.broadcast.to(roomName).emit('new_msg', {name: msg.senderName, text: msg.text})
        }
    })
});

const groupChat = io.of('/group-chat')
groupChat.on('connection',function (socket){
    let groupName;
    socket.on('join',(data)=>{
        groupName = data.groupName
        socket.join(groupName)
    })
    socket.on("new_msg", async (data)=>{
        socket.broadcast.to(groupName).emit("new_msg",data)
    })
})

// io.on('connection', (socket) => {
//     socket.on('join', (data) => {
//         console.log(data.name + " is Online !")
//         socket.join("fun")
//     })
//     socket.on("new_msg", (data) => {
//         socket.broadcast.to("fun").emit('new_msg', data)
//     })
// })
server.listen(process.env.PORT, () => {
    console.log(success('Server running on PORT ' + process.env.PORT))
})