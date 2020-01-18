import io from "socket.io-client";

export default class SocketIO{
    constructor(store){
        this.store=store
        this.socket=io('http://localhost:3000/chat')
    }
    listen(){
        this.socket.on('new-message',(data)=>{

        })
    }
    emit(data){
        this.socket.emit('new-message',data)
    }

}