import io from "socket.io-client";
import {eventBus} from "../main";

export default class SocketIO {
    constructor(store) {
        this.store = store
        this.__socket = io('http://localhost:3000')
        this.listen()
    }
    listen() {
        this.__socket.on("new_message", (data) => {
            eventBus.$emit('new_message',data)
        })
    }

    emit(data) {
        this.__socket.emit("new_message", data)
    }
    joinRoom(data){
        this.__socket.emit('join',data)
    }
}