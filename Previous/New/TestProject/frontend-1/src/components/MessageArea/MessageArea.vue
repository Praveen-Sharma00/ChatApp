<template>

    <div class="d-none d-sm-flex flex-column col-12 col-sm-7 col-md-9 p-0 h-100" id="message-area">
        <div :class="classList"></div>
        <message-area-navbar></message-area-navbar>
        <messages></messages>
        <message-input></message-input>
    </div>
</template>

<script>
    import Navbar_2 from "./Navbar";
    import Messages from "./Messages";
    import MessageInput from "./MessageInput";

    export default {
        name: "MessageArea",
        components:{
            'message-area-navbar': Navbar_2,
            'messages': Messages,
            'message-input': MessageInput
        },
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

<style>
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
</style>