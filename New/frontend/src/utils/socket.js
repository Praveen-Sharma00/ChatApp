import io from "socket.io-client";

export default class SocketIO{
    constructor(store){
        this.store=store
        this.__socket=io('http://localhost:3000')
        this.listen()
    }
    listen(){
        this.__socket.on('new_message',(data)=>{
            console.log("NEW_MSG : ",data)
        })
    }
    emit(data){
        this.__socket.emit("new_message",data)
    }
}