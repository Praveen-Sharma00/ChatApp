<template>
        <div class="container-fluid" id="main-container">
            <div class="row h-100">
                <chat-list></chat-list>
                <message-area></message-area>
            </div>
        </div>
</template>

<style>
    #main-container {
        width: 100vw;
        height: 100vh;
    }
</style>
<script>
    import ChatList from "./Chatlist/ChatList";
    import MessageArea from "./MessageArea/MessageArea";

    export default {
        components: {
            'chat-list': ChatList,
            'message-area': MessageArea,
        }
    }
</script>
