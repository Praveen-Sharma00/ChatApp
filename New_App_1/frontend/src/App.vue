<template>
    <div id="app">
        <div class="container-fluid" id="main-container">
            <div class="row h-100">
                <chat-list></chat-list>
                <message-area></message-area>
            </div>
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
    import ChatList from "./components/Chatlist/ChatList";
    import MessageArea from "./components/MessageArea/MessageArea";

    export default {
        components: {
            'chat-list': ChatList,
            'message-area': MessageArea,
        }
    }
</script>
