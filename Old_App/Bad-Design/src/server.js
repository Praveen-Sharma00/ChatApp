import app from './app'
import http from 'http'
import {userController} from "./controllers/user";
import Group from "./models/Group";
import Conversation from "./models/Conversation";

let server = http.createServer(app)
const socketio = require('socket.io')
const io = socketio(server)


const singleChat = io.of('/chat');
singleChat.on('connection', function (singleSocket) {
    let roomName;
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
groupChat.on('connection',function (socket) {
    let groupName;
    socket.on('join', (data) => {
        groupName = data.groupName
        socket.join(groupName)
    })
    socket.on("new_msg", async (data) => {
        console.log(data)
        let response = await userController.updateGroupMessage(data.currentUser.id, data.currentUser.name,data.text)
        if (response) {
            socket.broadcast.to(groupName).emit("new_msg", data)
            console.log('done')
        }
    })
})

server.listen(process.env.PORT, () => {
    console.log(success('Server running on PORT ' + process.env.PORT))
})