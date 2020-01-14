<template>
    <div class="col-12 col-sm-5 col-md-4 d-flex flex-column" id="chat-list-area" style="position:relative;">
        <chat-list-navbar></chat-list-navbar>
        <contact-list></contact-list>
        <settings></settings>
    </div>
</template>

<script>
    import Navbar_1 from "./Navbar";
    import ContactList from "./ContactList";
    import Settings from "../Profile/Settings";

    export default {
        name: "ChatList",
        components:{
            'chat-list-navbar': Navbar_1,
            'contact-list': ContactList,
            'settings':Settings
        }
    }
</script>

<style scoped>
    #chat-list-area{
        position: relative;
    }
</style>