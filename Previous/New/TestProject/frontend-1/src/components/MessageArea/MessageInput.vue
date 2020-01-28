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
                this.$store.state.user.contacts.find(x => x.id === id).conversations.push({
                        senderId: 2,
                        text: this.$refs.msgText.value,
                        sentAt: 'now'
                    }
                )
                this.$refs.msgText.value = ""
            }
        }
    }
</script>

<style>
    #input-area {
        background: hsl(0, 0%, 95%);
        /*box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);*/
        -webkit-box-shadow: 0px 4px 7px -1px rgba(0,0,0,0.55);
        -moz-box-shadow: 0px 4px 7px -1px rgba(0,0,0,0.55);
        box-shadow: 0px 4px 7px -1px rgba(0,0,0,0.55);
    }

    #input-area #input {
        outline: none;
    }

</style>