<template>

    <ul id="tabs" class="nav nav-tabs chat-tab fadeIn" role="tablist">
        <div class="active-pink-3 active-pink-4 mb-2">
            <input
                    class="form-control search-f"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
            />
            <span v-if="_CurrentUser.contacts && _CurrentUser.contacts.length>1">6 Contacts</span>
        </div>
        <template v-if="!_ChatList || _ChatList.length<1">
            <p class="text-center">No contacts</p>
        </template>

        <template v-else>
            <li class="nav-item" v-for="contact in _ChatList" @click="showMessageArea(contact)">
                <a id="tab-A" href="#pane-A" class="nav-link active" data-toggle="tab" role="tab">
                    <div class="d-flex align-items-center">
                        <div class="chat-img">
                            <img src="@/assets/images/75.jpg" alt/>
                        </div>
                        <div class="chat-user align-items-center">
                            <h6>{{contact.name}}</h6>
                            <p></p>
                        </div>
                    </div>
                </a>
            </li>
        </template>
        <!--        <li class="nav-item">-->
        <!--            <a id="tab-A" href="#pane-A" class="nav-link active" data-toggle="tab" role="tab">-->
        <!--                <div class="d-flex align-items-center">-->
        <!--                    <div class="chat-img">-->
        <!--                        <img src="@/assets/images/75.jpg" alt/>-->
        <!--                    </div>-->
        <!--                    <div class="chat-user align-items-center">-->
        <!--                        <h6>James Deo</h6>-->
        <!--                        <p>Admininstrator</p>-->
        <!--                    </div>-->
        <!--                </div>-->
        <!--            </a>-->
        <!--        </li>-->

        <!--        <li class="nav-item">-->
        <!--            <a id="tab-B" href="#pane-B" class="nav-link" data-toggle="tab" role="tab">-->
        <!--                <div class="d-flex align-items-center">-->
        <!--                    <div class="chat-img">-->
        <!--                        <img src="assets/images/75.jpg" alt="">-->
        <!--                    </div>-->
        <!--                    <div class="chat-user  align-items-center ">-->
        <!--                        <h6>-->
        <!--                            James Deo1-->
        <!--                        </h6>-->
        <!--                        <p>-->
        <!--                            Admininstrator-->
        <!--                        </p>-->
        <!--                    </div>-->
        <!--                </div>-->
        <!--            </a>-->
        <!--        </li>-->
    </ul>

</template>

<script>
    import chatDataMixin from "../../../mixins/chatDataMixin";
    import {eventBus} from "../../../main";

    export default {
        name: "ChatList",
        mixins: [chatDataMixin],
        data() {
            return {
                ChatListArr: []
            }
        },
        methods: {
            async showMessageArea(receiver) {
                let b = receiver._id
                let type = this.getCurrentConversationType()
                if (type === 'individual') {
                    let a = this._CurrentUser._id
                    if (a > b)
                        [a, b] = [b, a]
                    this.updateCurrentRoom(a + "," + b, type)
                } else {
                    await this.getCurrentUserPermission(
                        this._CurrentUser._id,
                        receiver._id
                    )
                    this.updateCurrentRoom(b, type)
                }
                // this.$socket.joinRoom({
                //     sender: this.$store.getters.getUser,
                //     receiver,
                //     type
                // })
                // this.$store.commit('SetMessageAreaState', true)
                // this.activeItem = receiver._id
                this.updateRecipientDetails({
                    _id: receiver._id,
                    name: receiver.name,
                    imageUrl: receiver.imageUrl
                })
                eventBus.$emit('load-conversations', type)
                // eventBus.$emit('load-conversations', type)
            }
        },
        computed: {
            _ChatList() {
                if (this.getCurrentConversationType() === "individual") {
                    this.ChatListArr = this._CurrentUser.contacts
                } else {
                    this.ChatListArr = this._CurrentUserGroupList
                }
                return this.ChatListArr
            }
        }
    }
</script>

<style scoped>
    .nav-tabs {
        display: none;
    }

    input.form-control.search-f {
        border-radius: 16px;
        width: 90%;
        margin: 0 auto;
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

    .active-pink-3.active-pink-4 span {
        color: #80808082;
        display: flex;
        justify-content: center;
        /* margin-top: 5px; */
    }

    .chat-tab .nav-link.active h6 {
        box-shadow: unset !important;
        border-radius: 4px;
        background-image: unset !important;
        color: #fff !important;
        margin-bottom: 2px;
    }

    .chat-tab .nav-link.active p {
        box-shadow: unset !important;
        border-radius: 4px;
        background-image: unset !important;
        color: #fff !important;
    }

    .chat-tab .nav-link {
        border-color: transparent !important;
        background: transparent !important;
        box-shadow: unset !important;
        border-radius: 4px;
    }

    .chat-img img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }

    .chat-tab a {
        padding: 10px 20px;
    }

    .chat-user {
        padding-left: 14px;
    }

    .chat-user.align-items-center h6 {
        color: #00000091;
        margin-bottom: 2px;
    }

    .chat-user.align-items-center p {
        color: #00000091;
    }

    .chat-user.align-items-center p {
        margin-bottom: 0px;
    }

    #tabs {
        overflow-y: scroll;
        max-height: 540px;
    }
</style>