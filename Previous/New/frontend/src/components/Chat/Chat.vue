<template>
    <div class="container-fluid" id="main-container">
        <div class="row h-100">
            <chat-list></chat-list>
            <message-area></message-area>
        </div>
    </div>
</template>

<script>
    import ChatList from "./Chatlist/ChatList";
    import MessageArea from "./MessageArea/MessageArea";

    export default {
        name: "Test",
        components: {
            'chat-list': ChatList,
            'message-area': MessageArea,
        },
        beforeMount() {
            this.initRoom()
        },
        methods: {
            initRoom() {
                this.$socket.joinRoom({
                    type: 'self',
                    userId: this.$store.getters.getUser._id
                })
            }
        },
        beforeCreate() {
            document.body.className = ""
        }
    }
</script>

<style scoped>
    #main-container {
        width: 100vw;
        height: 100vh;
    }
</style>