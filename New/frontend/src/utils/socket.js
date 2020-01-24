import io from "socket.io-client";
import {eventBus} from "../main";

export default class SocketIO {
    constructor(store) {
        this.store = store
        this.__socket = io('http://localhost:3000')
        this.listenForNewMessage()
        this.listenForNewUpload()
    }

    listenForNewMessage() {
        this.__socket.on("new_message", (data) => {
            eventBus.$emit('new_message', data)
        })
    }

    listenForNewUpload() {
        this.__socket.on("new_upload", (data) => {
            eventBus.$emit('new_upload', data)
        })
    }

    emit(data) {
        this.__socket.emit("new_message", data)
    }

    emit_media(media) {
        this.__socket.emit("new_upload", media)
    }

    emit_request_status(request) {
        this.__socket.emit('changed_request_status', request)
    }

    joinRoom(data) {
        this.__socket.emit('join', data)
    }
}