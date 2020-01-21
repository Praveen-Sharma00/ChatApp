<template>
    <!-- Message Area -->
    <div class="d-none d-sm-flex flex-column col-12 col-sm-7 col-md-8 p-0 h-100" id="message-area">
        <div class="w-100 h-100 overlay"></div>

        <!-- Navbar -->
        <div class="row d-flex flex-row align-items-center p-2 m-0 w-100" id="navbar">
            <div class="d-block d-sm-none">
                <i class="fas fa-arrow-left p-2 mr-2 text-white" style="font-size: 1.5rem; cursor: pointer;" onclick="showChatList()"></i>
            </div>
            <a href="#"><img src="https://via.placeholder.com/400x400" alt="Profile Photo" class="img-fluid rounded-circle mr-2" style="height:50px;" id="pic"></a>
            <div class="d-flex flex-column">
                <div class="text-white font-weight-bold" id="name"></div>
                <div class="text-white small" id="details"></div>
            </div>
            <div class="d-flex flex-row align-items-center ml-auto">
                <a href="#"><i class="fas fa-search mx-3 text-white d-none d-md-block"></i></a>
                <a href="#"><i class="fas fa-paperclip mx-3 text-white d-none d-md-block"></i></a>
                <a href="#"><i class="fas fa-ellipsis-v mr-2 mx-sm-3 text-white"></i></a>
            </div>
        </div>

        <!-- Messages -->
        <div class="d-flex flex-column" id="messages"></div>

        <!-- Input -->
        <div class="d-none justify-self-end align-items-center flex-row" id="input-area">
            <a href="#"><i class="far fa-smile text-muted px-3" style="font-size:1.5rem;"></i></a>
            <input type="text" name="message" id="input" placeholder="Type a message" class="flex-grow-1 border-0 px-3 py-2 my-3 rounded shadow-sm">
            <i class="fas fa-paper-plane text-muted px-3" style="cursor:pointer;" onclick="sendMessage()"></i>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MessageArea",
        computed:{
            classList(){
                if(this.$store.getters.GetMessageAreaState)
                    return "w-100 h-100 overlay d-none  "
                else
                    return "w-100 h-100 overlay"
            }
        }
    }
</script>

<style scoped>
    #message-area {
        border-left: 1px solid #e6e6e6;
        background-color: rgba(228, 228, 228, 0.81);
    }

    #message-area .overlay {
        background: hsl(0, 0%, 80%);
    }
    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 99;
    }
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
    .message-item {
        position: relative;
        max-width: 55%;
        word-break: break-word;
        border-radius: 30px !important;
        padding: 10px !important;
        font-size: 90%;
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }

    .message-item.self {
        background: #caf2f7 !important;
        /*background: #dcf8c6 !important;*/
    }
    .message-item .number {
        color: #1f7aec !important;
    }

    .message-item .options {
        position: absolute;
        top: 0;
        right: 15px !important;
        opacity: 0;
        transition: all .2s ease-in-out;
        -moz-transition: all .2s ease-in-out;
        -webkit-transition: all .2s ease-in-out;

    }

    .message-item:hover .options {
        opacity: 1;
        right: 0;

    }

    #messages {
        flex: 1 !important;
        background: hsl(27, 5%, 96%);
        overflow: auto;
    }
    #navbar {
        /*background: #009688;*/
        /*background-image: linear-gradient(to left bottom, #dee5e7, #76c9f2, #00a4ff, #0075ff, #5225f6);*/
        /*background-image: linear-gradient(to left bottom, #dee5e7, #99a9b3, #5d7083, #2d3a55, #0a0227);*/
        background: #43C6AC;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #191654, #43C6AC);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to left, #191654, #43C6AC); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    }
</style>