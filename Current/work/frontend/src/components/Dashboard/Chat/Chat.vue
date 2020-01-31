<template>
    <!--    <div>-->
    <!--        <div class="menu-flex-div  animated animatedFadeInUp fadeInUp">-->
    <!--            <div class="main-2-div">-->
    <!--                <div class="container-fluid">-->
    <!--                    <div class="row">-->
    <!--                        <div class="col chat-card">-->
    <!--                        </div>-->
    <!--                    </div>-->
    <!--                </div>-->

    <!--            </div>-->
    <!--        </div>-->
    <!--    </div>-->
    <div class="chat-div">
        <div class="chat-div-1">
            <div class="d-flex">
                <chat-list></chat-list>
                <div class="contact-all">
                    <div class="row w-100 justify-content-center">
                        <div :class="['col-sm-4 tab-title text-center fav-con',{'active':individualTabState}]"
                             @click="getUserContacts()">
                            <i class="fas fa-user"></i>
                            Individual
                        </div>
                        <div :class="['col-sm-4 tab-title text-center fav-con',{'active':groupTabState}]"
                             @click="getUserGroups()">
                            <i class="fas fa-users"></i>
                            Group
                        </div>
                    </div>
                </div>
                <message-area></message-area>
            </div>
        </div>
    </div>
</template>

<script>
    import ChatList from "./ChatList";
    import MessageArea from "./MessageArea";

    export default {
        name: "Chat",
        data() {
            return {
                currentActiveTab: 'individual',
                individualTabState: true,
                groupTabState: false
            }
        },
        components: {
            "chat-list": ChatList,
            "message-area": MessageArea
        },
        methods: {
            getUserContacts() {
                this.individualTabState = true
                this.groupTabState = false
                this.currentActiveTab = 'individual'
            },
            getUserGroups() {
                this.individualTabState = false
                this.groupTabState = true
                this.currentActiveTab = 'group'
            }
        }
    };
</script>

<style scoped>
    .nav-tabs {
        display: none;
    }

    @media (min-width: 768px) {
        .nav-tabs {
            display: flex;
            flex-flow: column nowrap;
        }

        .chat-tab {
            border-bottom: none;
            border-right: 1px solid #ddd;
            display: flex;
            width: 40%;
            background: #f6f6f6;
            padding: 20px 0px;
            height: 600px;
        }

        /* .nav-tabs {
                margin: 0 15px;
              } */
        .nav-tabs .nav-item + .nav-item {
            margin-top: 0.25rem;
        }

        .chat-div .nav-link {
            transition: border-color 0.125s ease-in;
            white-space: nowrap;
        }

        .nav-tabs .nav-link:hover {
            background-color: #f7f7f7;
            border-color: transparent;
        }

        .nav-tabs .nav-link.active {
            border-bottom-color: #ddd;
            border-right-color: #fff;
            border-bottom-left-radius: 0.25rem;
            border-top-right-radius: 0;
            margin-right: -1px;
        }

        .nav-tabs .nav-link.active:hover {
            background-color: #fff;
            border-color: #0275d8 #fff #0275d8 #0275d8;
        }
    }

    @media (max-width: 767px) {
        .tab-pane {
            display: block !important;
            opacity: 1;
        }
    }

    .chat-div {
        opacity: 0.99;
        border-radius: 20px;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    }

    .chat-body-img img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        box-shadow: 0 2px 20px -5px #ef6c00;
    }

    div#content {
        width: 100%;
        height: 600px;
    }

    .body-chat-div-img img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    .active-pink-3.active-pink-4 span {
        color: #80808082;
        display: flex;
        justify-content: center;
        /* margin-top: 5px; */
    }

    .active-pink-3.active-pink-41.mt-3 {
        overflow: hidden;
    }

    .contact-all {
        position: absolute;
        bottom: 0px;
        width: 28%;
        height: 70px;
        padding-top: 10px;
        font-size: 12px;
    }

    ul#Commentary li {
        list-style-type: none;
    }

    ul#Commentary {
        padding-left: 0px;
    }

    .contact-all a {
        padding: 0;
    }

    .contact-all .fas {
        width: 30px;
        background-image: linear-gradient(#0a2b4f, #af1212) !important;
        color: #fff !important;
        border-radius: 50%;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
    }

    .contact-all .far {
        width: 30px;
        background-image: linear-gradient(#0a2b4f, #af1212) !important;
        color: #fff !important;
        border-radius: 50%;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
    }

    .contact-all p {
        color: gray;
        margin-top: 5px;
    }

    .contact-all .tab-title {
        padding-top: 4px;
    }

    .contact-all .tab-title:hover {
        background: rgb(235, 233, 233);
        cursor: pointer;
    }

    .contact-all .active {
        background: rgb(206, 204, 204);
    }

    .contact-all a {
        text-decoration: none;
    }
</style>