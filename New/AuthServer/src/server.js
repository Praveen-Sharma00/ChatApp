import app from './app'
import http from 'http'

import UserDetailService from "./services/user";

const _userDetailService = new UserDetailService()

const server = http.createServer(app)
const io = require('socket.io')(server)

io.on('connection', (socket) => {
    let roomName = ''
    socket.on('join', (data) => {
        if (data.type === "individual") {
            let a = data.sender._id
            let b = data.receiver._id
            if (a > b)
                [a, b] = [b, a]
            roomName = a + "," + b
        } else if (data.type === "group") {
            roomName = data.receiver._id + ""
        } else if (data.type === "self") {
            roomName = data.userId
        }
        socket.join(roomName)
    })
    socket.on('new_message', async function (data) {
        let res = ''
        if (data.room.type === "individual") {
            res = await _userDetailService.updateIndividualConversation(data.room, data.sender, data.receiver, data.text, data.message_type, data.media)
        } else if (data.room.type === "group") {
            res = await _userDetailService.updateGroupConversation(data.room, data.sender, data.receiver, data.text, data.message_type, data.media)
        }
        socket.broadcast.to(data.room.name).emit('new_message', {
            room: data.room,
            sender: data.sender,
            text: data.text,
        })
    })
    socket.on('new_upload', async function (data) {
        let allowedToSend = false
        if (data.message_type === 'individual') {
            await _userDetailService.updateIndividualConversation(data.room, data.sender, data.receiver, data.text, data.message_type, data.media)
            allowedToSend = true
        } else {
            if (data.admins.includes(data.sender.id)) {
                allowedToSend = true
            }
        }

        if (allowedToSend === true) {
            socket.broadcast.to(data.room.name).emit('new_upload', {
                media: data.media,
                sender: data.sender
            })
            await _userDetailService.updateGroupConversation(data.room, data.sender, data.receiver, data.text, data.message_type, data.media)
        } else {
            await _userDetailService.createUploadRequest({
                groupId: data.receiver.id,
                media: data.media,
                sender: data.sender
            })
            data.admins.forEach((admin) => {
                socket.broadcast.to(admin).emit('new_upload_approval_request', {
                    media: data.media,
                    sender: data.sender
                })
            })
        }
    })
    socket.on('disconnect', function () {
        io.emit('user disconnected');
    });
})

server.listen(process.env.PORT, () => {
    console.log(success("Server listening on PORT " + process.env.PORT))
})