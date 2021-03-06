import app from './app'
import http from 'http'
import mongoose from 'mongoose'
import UserDetailService from "./services/user";

const _userDetailService = new UserDetailService()
const server = http.createServer(app)
const socketio = require('socket.io')
const io = socketio(server)

io.on('connection', function (socket) {
    socket.on('login', (user) => {
        console.log(user.name + " is Online !")
    })
    let roomName = "";
    socket.on('join', (data) => {
        if (data.type === "individual") {
            let a = data.sender._id
            let b = data.rec_id
            if (a > b)
                [a, b] = [b, a]
            roomName = a + "," + b
        } else if (data.type === "group") {
            roomName = data.rec_id + ""
        }
        socket.join(roomName)
    })
    socket.on('init', (data) => {
        socket.join(data.id)
    })

    socket.on('new_upload', (data) => {
        const admins = data.admins

        admins.forEach((e) => {
            socket.broadcast.to(e._id).emit('new_upload', {
                sender: data.sender,
                group: data.receiver,
                media_type: data.media_type,
                text: data.text
            })
        })

    })
    socket.on('new_msg', async (metadata) => {
        let _room;
        let a = metadata.sender._id
        let b = metadata.receiver
        if (a > b)
            [a, b] = [b, a]
        if (metadata.type === "individual") {
            _room = a + "," + b
        } else {
            _room = b + ""
        }
        let res;
        if (metadata.type === "individual") {
            res = await _userDetailService.updateIndividualConversation(metadata.sender._id, metadata.receiver, metadata.text, metadata.message_type, metadata.media_type)
        } else if (metadata.type === "group") {
            res = await _userDetailService.updateGroupConversation(metadata.sender._id, metadata.receiver, metadata.text, metadata.message_type, metadata.media_type)
        }
        socket.broadcast.to(_room).emit('new_msg', {
            name: metadata.sender.name,
            text: metadata.text,
            message_type: metadata.message_type,
            media_type: metadata.media_type,
            sentBy: metadata.sentBy
        })
    })
})

server.listen(process.env.PORT, () => {
    console.log(success("Server listening on PORT " + process.env.PORT))
})