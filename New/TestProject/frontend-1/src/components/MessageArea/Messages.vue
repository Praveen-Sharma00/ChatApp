<template>
    <!-- Messages -->
    <div class="d-flex flex-column" id="messages">

        <div v-for="msg in loadConversations"
             :class="['p-1 my-1 mx-3 rounded bg-white shadow-sm message-item',currentUserId===msg.sender.id?'align-self-end self':'align-self-start']">
            <div class="options">
                <a href="#"><i class="fas fa-angle-down text-muted px-2"></i></a>
            </div>

            <div class="d-flex flex-row">
                <div class="body m-1 mr-2">{{msg.text}}</div>
                <div class="time ml-auto small text-right flex-shrink-0 align-self-end text-muted" style="width:75px;">
                    {{msg.sentAt}}
                    <i class="fas fa-check-circle"></i>
                </div>
            </div>
        </div>

        <!--        <div    v-for="msg in loadConversations"-->
        <!--                class="align-self-start  p-1 my-1 mx-3 rounded bg-white shadow-sm message-item">-->
        <!--            <div class="options">-->
        <!--                <a href="#"><i class="fas fa-angle-down text-muted px-2"></i></a>-->
        <!--            </div>-->

        <!--            <div class="d-flex flex-row">-->
        <!--                <div class="body m-1 mr-2">Some message Some message Some message Some message</div>-->
        <!--                <div class="time ml-auto small text-right flex-shrink-0 align-self-end text-muted" style="width:75px;">-->
        <!--                    22:41-->
        <!--                    <i class="fas fa-check-circle"></i>-->
        <!--                </div>-->
        <!--            </div>-->
        <!--        </div>-->

    </div>
</template>

<script>
    import {eventBus} from "../../main";
    import SocketIO from "../../utils/socket";

    export default {
        name: "Messages",
        data() {
            return {
                messages: []
            }
        },
        computed: {
            currentUserId() {
                return this.$store.state.user.id
            },
            loadConversations() {
                return this.messages
            }

        },
        mounted() {
            eventBus.$on("load-conversations", (id) => {
                this.$store.dispatch('fetchConversations',1)
                this.messages = this.$store.state.currentConversation.messages
            })

        }
    }
</script>

<style>
    .message-item {
        position: relative;
        max-width: 75%;
        word-break: break-word;
    }

    .message-item.self {
        background: #dcf8c6 !important;
    }

    .message-item .number {
        color: #1f7aec !important;
    }

    .message-item .options {
        position: absolute;
        top: 0;
        right: -3px;
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
        background: hsl(0, 2%, 83%);
        overflow: auto;
    }
</style>