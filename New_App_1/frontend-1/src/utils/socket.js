import io from "socket.io-client";

export default class SocketIO{
    constructor(store){
        this.store=store
        this.socket=io('http://localhost:3000')
        this.listenForMessage()
    }
    listenForMessage(){
        this.socket.on('new-message',(data)=>{
            if(data.sender.id ===  this.store.state.currentRecipient.id){
                this.store.state.currentConversation.messages.push({
                        message_type: 'text',
                        text: data.text,
                        sender: {
                            id: data.sender.id,
                            name: data.sender.name
                        },
                        sentAt: 'now'
                    }
                )
            }

        })
    }
    emitMessage(data){
        this.socket.emit('new-message',data)
        this.store.state.currentConversation.messages.push({
                message_type: 'text',
                text: data.text,
                sender: {
                    id: this.store.state.user.id,
                    name: 'A'
                },
                sentAt: 'now'
            }
        )
    }
}