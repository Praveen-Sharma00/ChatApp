<template>
    <div class="col-12 col-sm-4 col-md-3 d-flex flex-column" id="chat-list-area" style="position:relative;">
        <!-- Navbar -->
        <div class="row d-flex flex-row align-items-center p-2" id="navbar">
            <img
                    alt="Profile Photo"
                    class="img-fluid rounded-circle mr-2"
                    style="height:50px; cursor:pointer;"
                    @click="showProfileSettings()"
                    id="display-pic"
                    src="https://p7.hiclipart.com/preview/4/1012/949/github-bitbucket-fork-software-repository-icons-for-windows-github-logo.jpg">
            <div class="text-white font-weight-bold" id="username">{{currentSessionUser.name}}</div>
            <div class="nav-item dropdown ml-auto">
                <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true"
                   aria-expanded="false"><i class="fas fa-ellipsis-v text-white"></i></a>
                <div class="dropdown-menu dropdown-menu-right">
                    <a class="dropdown-item" href="#">New Group</a>
                    <a class="dropdown-item" href="#">Settings</a>
                    <a class="btn btn-primary dropdown-item" style="cursor: pointer" @click="logout">Log Out</a>
                </div>
            </div>
        </div>

        <!-- Chat List -->

        <div class="row chat-list" id="contacts" style="overflow:auto;">
            <div class="alert alert-success " role="alert"
                 style="width:100%;margin-bottom: 1px !important;padding:2px 5px !important;">
                Personal
            </div>
            <template v-if="!currentSessionUser.contacts">
                <p class="text-center mx-5">No contacts</p>
            </template>
            <template v-else>
                <div :id="contact._id+','+contact.name"
                     :class="['chat-list-item','d-flex', 'flex-row','w-100', 'p-2', 'border-bottom',contact._id==activeItem?'active':'']"
                     v-for="contact in currentSessionUser.contacts"
                     @click="showMessageArea(contact,'individual')">
                    <img :src="contact.imageUrl"
                         alt="Profile Photo" class="img-fluid rounded-circle mr-2" style="height:50px;width:50px;">
                    <div class="w-50">
                        <div class="name mt-3">{{contact.name}}</div>
                        <!--                        <div class="small last-message">+91 9876512345 : Some message ...-->
                        <!--                            <i class=" fa-check-circle mr-1"></i>-->
                        <!--                        </div>-->
                    </div>
                    <!--                    <div class="flex-grow-1 text-right">-->
                    <!--                        <div class="small time">28/03/2018</div>-->
                    <!--                        <div class="badge badge-success badge-pill small" id="1">2</div>-->
                    <!--                    </div>-->
                </div>
            </template>
        </div>
        <div class="row chat-list" id="group-list">
            <div class="alert alert-success " role="alert"
                 style="width:100%;margin-bottom: 1px !important;padding:2px 5px !important;">
                Groups
            </div>
            <template v-if="!currentUserGroups">
                <p class="text-center mx-5">No Groups</p>

            </template>
            <template v-else>
                <div :id="group._id+','+group.name"
                     :class="['chat-list-item','d-flex', 'flex-row','w-100', 'p-2', 'border-bottom',group._id==activeItem?'active':'']"
                     v-for="group in  currentUserGroups"
                     @click="showMessageArea(group,'group')">
                    <img :src="group.imageUrl"
                         alt="Profile Photo" class="img-fluid rounded-circle mr-2" style="height:50px;width:50px;">
                    <div class="w-50">
                        <div class="name mt-3">{{group.name}}</div>
                        <!--                        <div class="small last-message">+91 9876512345 : Some message ...-->
                        <!--                            <i class=" fa-check-circle mr-1"></i>-->
                        <!--                        </div>-->
                    </div>
                    <!--                    <div class="flex-grow-1 text-right">-->
                    <!--                        <div class="small time">28/03/2018</div>-->
                    <!--                        <div class="badge badge-success badge-pill small" id="1">2</div>-->
                    <!--                    </div>-->
                </div>
            </template>
        </div>

        <!-- Profile Settings -->
        <div class="d-flex flex-column w-100 h-100" id="profile-settings" :style="{left:left+'%'}">
            <div class="row d-flex flex-row align-items-center p-2 m-0" style="background:#009688; min-height:65px;">
                <i class="fas fa-arrow-left p-2 mx-3 my-1 text-white" style="font-size: 1.5rem; cursor: pointer;"
                   @click="hideProfileSettings()"></i>
                <div class="text-white font-weight-bold">Profile</div>
            </div>
            <div class="d-flex flex-column" style="overflow:auto;">
                <img alt="Profile Photo" class="img-fluid rounded-circle my-5 justify-self-center mx-auto"
                     id="profile-pic">
                <input type="file" id="profile-pic-input" class="d-none">
                <div class="bg-white px-3 py-2">
                    <div class="text-muted mb-2"><label for="input-name">Your Name</label></div>
                    <input type="text" name="name" id="input-name" class="w-100 border-0 py-2 profile-input">
                </div>
                <div class="text-muted p-3 small">
                    This is not your username or pin. This name will be visible to your WhatsApp contacts.
                </div>
                <div class="bg-white px-3 py-2">
                    <div class="text-muted mb-2"><label for="input-about">About</label></div>
                    <input type="text" name="name" id="input-about" value="" class="w-100 border-0 py-2 profile-input">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {eventBus} from "../../../main";

    export default {
        name: "ChatList",
        data() {
            return {
                activeItem: '',
                left: -110,
                userGroups: []
            }
        },
        mounted() {
            eventBus.$on("show-profile-settings", () => {
                this.left = 0
            })
        },
        computed: {
            currentSessionUser() {
                return this.$store.getters.getUser
            },
            currentUserGroups() {
                return this.$store.getters.GetUserGroupList
            }
        },
        methods: {
            showMessageArea(receiver, type) {
                let b = receiver._id
                if (type === 'individual') {
                    let a = this.$store.getters.getUser._id
                    if (a > b)
                        [a, b] = [b, a]
                    this.$store.commit('SetCurrentRoom', {name: a + "," + b, type: type})
                } else {
                    this.$store.commit('SetCurrentRoom', {name: b, type: type})
                }
                this.$socket.joinRoom({
                    sender: this.$store.getters.getUser,
                    receiver,
                    type
                })
                this.$store.commit('SetMessageAreaState', true)
                this.activeItem = receiver._id
                this.$store.commit('SetRecipientDetails', {
                    id: receiver._id,
                    name: receiver.name,
                    imageUrl: receiver.imageUrl
                })
                eventBus.$emit('load-conversations', type)
            },
            showProfileSettings() {
                eventBus.$emit("show-profile-settings")
            },
            hideProfileSettings() {
                this.left = -110
            },
            logout() {
                this.$store.dispatch('logout')
                this.$router.push('/')
            }
        }
    }
</script>

<style>
    #chat-list-area {
        position: relative;
    }

    /*#chat-list {*/
    /*    overflow: auto;*/
    /*    max-height: 85vh;*/
    /*}*/
    .chat-list {
        overflow: auto;
        max-height: 85vh;
    }

    .chat-list-item {
        margin-bottom: 3px;
        background: white;
        cursor: pointer;
        /*border-radius: 30px;*/

    }


    .chat-list-item:hover {
        background: hsl(0, 0%, 95%);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    }

    .chat-list-item:active {
        background: hsl(0, 0%, 85%);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

    }

    .chat-list-item.active {
        background: hsl(0, 0%, 90%);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    }

    .chat-list-item .chat-details {
        width: 60%;
    }

    .chat-list-item.unread .name,
    .chat-list-item.unread .last-message {
        font-weight: bold;
    }

    .chat-list-item .last-message {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    #navbar {
        /*background: #009688;*/
        background: #2C3E50; /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #4CA1AF, #2C3E50); /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #4CA1AF, #2C3E50); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    }

    .dropdown-toggle::after {
        display: none;
    }

    #profile-settings {
        position: absolute;
        top: 0;
        left: -110%;
        background: hsl(0, 0%, 95%);
        transition: all 0.2s ease-in;
        -moz-transition: all .2s ease-in-out;
        -webkit-transition: all .2s ease-in-out;
    }

    #profile-pic {
        cursor: pointer;
        position: relative;
        width: 200px;
    }

    .profile-input {
        border-bottom: 2px solid transparent !important;
        outline: none;
    }

    .profile-input:focus {
        border-bottom-color: hsl(0, 0%, 50%) !important;
    }
</style>