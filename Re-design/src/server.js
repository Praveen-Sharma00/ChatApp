import app from './app'
import http from 'http'

const server = http.createServer(app)
const socketio = require('socket.io')
const io = socketio(server)

server.listen(process.env.PORT,()=>{
    console.log(success("Server listening on PORT "+process.env.PORT ))
})