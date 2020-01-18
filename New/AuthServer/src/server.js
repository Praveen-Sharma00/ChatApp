import app from './app'
import http from 'http'
// import UserDetailService from "./services/user";
//
// const _userDetailService = new UserDetailService()
const server = http.createServer(app)
const io = require('socket.io')(server)

io.on('connection',(socket)=>{
    console.log('Someone connected !')
})

server.listen(process.env.PORT, () => {
    console.log(success("Server listening on PORT " + process.env.PORT))
})