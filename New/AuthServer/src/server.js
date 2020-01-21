import app from './app'
import http from 'http'

const server = http.createServer(app)
const io = require('socket.io')(server)

io.on('connection',(socket)=>{
    socket.on('new_message',(data)=>{
        console.log("REC : ",data)
        socket.emit('new_message',data)
    })
    socket.on('disconnect', ()=>{
        console.log("A user disconnected");
    });
})

server.listen(process.env.PORT, () => {
    console.log(success("Server listening on PORT " + process.env.PORT))
})