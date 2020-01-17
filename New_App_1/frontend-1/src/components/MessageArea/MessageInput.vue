<template>
    <!-- Input -->
    <div :class="classList" id="input-area">
        <a href="#"><i class="far fa-smile text-muted px-3" style="font-size:1.5rem;"></i></a>
        <input type="text" name="message" id="input" placeholder="Type a message"
               class="flex-grow-1 border-0 px-3 py-2 my-3 rounded shadow-sm" ref="msgText">
        <i class="fas fa-paper-plane text-muted px-3" style="cursor:pointer;"
           @click="sendMessage()"></i>
    </div>
</template>

<script>
    export default {
        name: "MessageInput",
        computed: {
            classList() {
                if (this.$store.getters.GetMessageAreaState)
                    return "d-flex justify-self-end align-items-center flex-row"
                else
                    return "d-none justify-self-end align-items-center flex-row"
            }
        },
        methods: {
            sendMessage() {
                let id = this.$store.state.currentRecipient.id
                // this.$store.state.currentConversation.messages.push({
                //         message_type: 'text',
                //         text: this.$refs.msgText.value,
                //         sender: {
                //             id: this.$store.state.user.id,
                //             name: 'A'
                //         },
                //         sentAt: 'now'
                //     }
                // )
                this.$socket.emitMessage({
                    message_type:'text',
                    text:this.$refs.msgText.value,
                    sender:{
                        id:this.$store.state.user.id,
                        name:'A'
                    },
                    sentAt:'now'
                })
                this.$refs.msgText.value = ""
            }
        }
    }
</script>

<style>
    #input-area {
        background: hsl(0, 0%, 95%);
    }

    #input-area #input {
        outline: none;
    }

</style>