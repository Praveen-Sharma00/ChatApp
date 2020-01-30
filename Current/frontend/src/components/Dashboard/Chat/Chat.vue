<template>
    <div>
        <div class="menu-flex-div  animated animatedFadeInUp fadeInUp">
            <div class="main-2-div">
                <div class="row">
                    <div class="col-sm-12 chat-card">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ChatList from "./ChatList";
    import MessageArea from "./MessageArea";

    export default {
        name: "Chat",
        components: {
            "chat-list": ChatList,
            "message-area": MessageArea
        }
    };
</script>

<style scoped>
    .main-2-div {
        margin-top: -2px;
    }

    .chat-card {
        margin-top: -35px !important;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
        background: #fff;
        border-radius: 12px;
        max-height: 100vh;
        min-height: 90vh;
        opacity: 0.98;
    }
</style>