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
    /*#main-container {*/
    /*    width: 100vw;*/
    /*    height: 100vh;*/
    /*}*/

    /*#navbar {*/
    /*    background: #009688;*/
    /*}*/
    #main-container {
        width: 100vw;
        height: 100vh;
    }

    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-track {
        background: none;
    }

    ::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.2);
    }
    ::-webkit-scrollbar-thumb:hover {
        background: rgba(0, 0, 0, 0.3);
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
