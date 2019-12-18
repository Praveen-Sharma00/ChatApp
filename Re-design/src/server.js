import app from './app'
import http from 'http'

const server = http.createServer(app)
server.listen(process.env.PORT,()=>{
    console.log(success("Server listening on PORT "+process.env.PORT ))
})