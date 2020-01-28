<template>
    <!-- Message Area -->
    <div class="d-none d-sm-flex flex-column col-12 col-sm-8 col-md-9 p-0 h-100" id="message-area">
        <div :class="classListOverlay"></div>

        <!-- Navbar -->
        <div class="row d-flex flex-row align-items-center p-2 m-0 w-100" id="navbar">
            <div class="d-block d-sm-none">
                <i class="fas fa-arrow-left p-2 mr-2 text-white" style="font-size: 1.5rem; cursor: pointer;"
                   @click="showChatList()"></i>
            </div>
            <a href="#"><img :src="currentRecipient.imageUrl" alt="Profile Photo"
                             class="img-fluid rounded-circle mr-2" style="height:50px;width:50px;" id="pic"></a>
            <div class="d-flex flex-column">
                <div class="text-white font-weight-bold" id="name">{{currentRecipient.name}}</div>
                <div class="text-white small" id="details"></div>
            </div>
            <div class="d-flex flex-row align-items-center ml-auto">
                <template v-if="permissions.isAdmin && conversationType==='group'">
                    <a href="#" @click="getPendingRequests" data-toggle="modal" data-target="#approvalRequestModal">
                        <i class="far fa-clock mx-3 text-white" title="Pending Upload Approvals"></i>
                    </a>
                    <a href="#" @click="getRemainingUserList" data-toggle="modal" data-target="#addMembersFormModal">
                        <i class="fas fa-user-plus mx-3 text-white" title="Add members to group"></i>
                    </a>
                </template>
                <a href="#" :class="classListAttachment" data-toggle="modal" data-target="#fileUploadModal">
                    <i class="fas fa-paperclip mx-3 text-white d-none d-md-block"></i>
                </a>
                <a href="#">
                    <i class="fas fa-ellipsis-v mr-2 mx-sm-3 text-white"></i>
                </a>
            </div>
        </div>

        <!-- Messages -->
        <div class="d-flex flex-column" id="messages">
            <template v-for="msg in messages">
                <template v-if="msg.message_type==='text'">
                    <div :class="['p-1 my-1 mx-3 rounded bg-white shadow-sm message-item',currentUser._id===msg.sender.id?'align-self-end self':'align-self-start']">
                        <div class="options">
                            <a href="#"><i class="fas fa-angle-down text-muted px-2"></i></a>
                        </div>
                        <div class="d-flex flex-row">
                            <div class="body m-1 mr-2">
                        <span v-if="conversationType==='group'" class="text-muted"
                              style="font-weight: 600;font-size:12px;text-decoration: underline">
                            <template v-if="currentUser._id===msg.sender.id">Me</template>
                            <template v-else> {{msg.sender.name}}</template>
                            <br></span>
                                {{msg.text}}
                                <div class="time ml-auto small align-text-bottom text-right flex-shrink-1 align-self-end text-muted"
                                     style="width:127px;">
                                    {{msg.sentAt}}
                                    <!--                        <i class="fas fa-check-circle"></i>-->
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-else-if="msg.message_type==='media'">
                    <div v-for="(type,index) in msg.media.type"
                         :class="['p-1 my-1 mx-3 rounded bg-white shadow-sm message-item',currentUser._id===msg.sender.id?'align-self-end self':'align-self-start']">
                        <div class="options">
                            <a href="#"><i class="fas fa-angle-down text-muted px-2"></i></a>
                        </div>
                        <div class="d-flex flex-row">
                            <div class="body m-1 mr-2">
                        <span v-if="conversationType==='group'" class="text-muted"
                              style="font-weight: 600;font-size:12px;text-decoration: underline">
                            <template v-if="currentUser._id===msg.sender.id">Me</template>
                            <template v-else> {{msg.sender.name}}</template>
                            <br></span>
                                <template v-if="type==='doc'">
                                    <a :href="'http://localhost:3000/uploads/'+msg.media.location[index]"><img
                                            class="upload_media" src="@/assets/img/doc.png"></a>
                                </template>
                                <template v-else-if="type==='pdf'">
                                    <a :href="'http://localhost:3000/uploads/'+msg.media.location[index]"><img
                                            class="upload_media" src="@/assets/img/pdf.png"></a>
                                </template>
                                <template v-else="type==='image'">
                                    <a :href="'http://localhost:3000/uploads/'+msg.media.location[index]"><img
                                            class="upload_media" src="@/assets/img/pic.png"></a>
                                </template>
                                <div class="time ml-auto small align-text-bottom text-right flex-shrink-1 align-self-end text-muted"
                                     style="width:127px;">
                                    {{msg.sentAt}}
                                    <!--                        <i class="fas fa-check-circle"></i>-->
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </template>
        </div>

        <!-- Input -->
        <div :class="classListInput" id="input-area">
            <a href="#"><i class="far fa-smile text-muted px-3" style="font-size:1.5rem;"></i></a>
            <input type="text" name="message" id="input" placeholder="Type a message"
                   class="flex-grow-1 border-0 px-3 py-2 my-3 rounded shadow-sm" ref="msgText">
            <i class="fas fa-paper-plane text-muted px-3" style="cursor:pointer;" @click="sendMessage('text')"
            ></i>
        </div>

        <div class="modal fade" id="fileUploadModal" ref="fileUploadModal" tabindex="-1" role="dialog"
             aria-labelledby="fileUploadModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <form @submit.prevent="submitFileUpload" enctype="multipart/form-data">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Select file</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="custom-file">
                                <input type="file" multiple class="custom-file-input" name="file" id="customFile"
                                       ref="file">
                                <label class="custom-file-label" for="customFile">Choose file</label>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">Save changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="modal fade" id="approvalRequestModal" ref="approvalRequestModal" tabindex="-1" role="dialog"
             aria-labelledby="approvalRequestModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-scrollable" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="approvalRequestModalLabel">Pending Approval Requests</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <template v-if="!pendingApprovals">
                            <div class="alert alert-danger" role="alert">
                                No new request(s) so far !
                            </div>
                        </template>
                        <template v-else>
                            <table class="table table-striped">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Sender</th>
                                    <th scope="col">Uploads</th>
                                    <th scope="col">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                <template v-for="(request,i) in pendingApprovals">
                                    <tr :id="request._id">
                                        <th scope="row">{{i+1}}</th>
                                        <td>{{request.sender.name}}</td>
                                        <template v-for="(upload,j) in request.media.type">
                                            <template v-if="upload === 'doc'">
                                                <a :href="'http://localhost:3000/uploads/'+request.media.location[j]">
                                                    <img src="@/assets/img/doc.png" class="list_media">
                                                </a>
                                            </template>
                                            <template v-if="upload === 'pdf'">
                                                <a :href="'http://localhost:3000/uploads/'+request.media.location[j]">
                                                    <img src="@/assets/img/pdf.png" class="list_media">
                                                </a>
                                            </template>
                                            <template v-if="upload === 'image'">
                                                <a :href="'http://localhost:3000/uploads/'+request.media.location[j]">
                                                    <img src="@/assets/img/pic.png" class="list_media">
                                                </a>
                                            </template>
                                        </template>
                                        <td>
                                            <button @click="updateRequestStatus($event,request)" type="button"
                                                    class="btn-sm btn-success" :id="'accept-'+request._id"
                                                    title="Accept"><i
                                                    class="fas fa-check-circle"></i></button>
                                            &nbsp;&nbsp;
                                            <button @click="updateRequestStatus($event,request)" type="button"
                                                    class="btn-sm btn-danger" :id="'reject-'+request._id"
                                                    title="Reject"><i
                                                    class="fas fa-times-circle"></i></button>
                                        </td>
                                    </tr>
                                </template>

                                </tbody>
                            </table>
                        </template>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="addMembersFormModal" ref="addMembersFormModal" tabindex="-1" role="dialog"
             aria-labelledby="addMembersFormModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <form @submit.prevent="addMembersToGroup" enctype="multipart/form-data">
                        <div class="modal-header">
                            <h5 class="modal-title" id="addGroupFormModalLabel">Create new Group</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div>
                                <multiselect v-model="selectedMembers" :options="userContacts" :multiple="true"
                                             :close-on-select="false" :clear-on-select="false" :preserve-search="true"
                                             placeholder="Select members" label="name" track-by="name"
                                             :preselect-first="true">
                                    <template slot="selection" slot-scope="{ values, search, isOpen }"><span
                                            class="multiselect__single" v-if="values.length && !isOpen">{{ values.length }} member(s) selected</span>
                                    </template>
                                </multiselect>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {eventBus} from "../../../main";
    import Multiselect from 'vue-multiselect'

    export default {
        name: "MessageArea",
        components: {
            Multiselect
        },
        mounted() {
            eventBus.$on("load-conversations", async (type) => {
                this.conversationType = type
                if (type === "individual") {
                    await this.$store.dispatch('GetConversationBetweenUsers', {
                        id_a: this.$store.getters.getUser._id,
                        id_b: this.$store.getters.GetCurrentRecipient.id
                    })
                } else {
                    await this.$store.dispatch('GetGroupAdmins', this.$store.getters.GetCurrentRecipient.id)
                    await this.$store.dispatch('GetUserPermissions', {
                        userId: this.$store.getters.getUser._id,
                        groupId: this.$store.getters.GetCurrentRecipient.id
                    })
                    this.permissions = this.$store.getters.GetUserPermissions

                    await this.$store.dispatch('GetGroupConversations', {
                        id: this.$store.getters.GetCurrentRecipient.id
                    })
                }
                if (!this.$store.getters.GetCurrentConversation)
                    this.messages = []
                else
                    this.messages = this.$store.getters.GetCurrentConversation
            })
            eventBus.$on("new_message", (data) => {
                this.messages.push({
                    sender: {
                        id: data.sender._id,
                        name: data.sender.name
                    },
                    media: {
                        type: [], location: []
                    },
                    message_type: 'text',
                    text: data.text,
                    sentAt: "Jan 2020"
                })
            })
            eventBus.$on('new_upload', (data) => {
                this.messages.push({
                    sender: {
                        id: data.sender.id,
                        name: data.sender.name
                    },
                    media: {
                        type: data.media.type,
                        location: data.media.location
                    },
                    message_type: 'media',
                    text: '',
                    sentAt: "Jan 2020"
                })
            })
        },
        data() {
            return {
                messages: [],
                conversationType: '',
                uploadedFile: '',
                permissions: {},
                groupAdmins: [],
                pendingApprovals: [],
                userContacts: [],
                selectedMembers: [],
                existingMembers: []
            }
        },
        methods: {
            async submitFileUpload() {
                const selectedFiles = this.$refs.file.files
                this.uploadedFile = selectedFiles
                await this.$store.dispatch('UploadFile', selectedFiles)
                alert("Files uploaded")
                this.sendMediaMessage(this.conversationType, this.$store.getters.GetCurrentUploadedFileDetails)
            },
            async getPendingRequests() {
                await this.$store.dispatch('GetPendingUploadApprovals', this.$store.getters.GetCurrentRecipient.id)
                this.pendingApprovals = this.$store.getters.GetPendingApprovals
            },
            sendMediaMessage(conversationType, fileData) {
                let admins = [], permissions = []
                if (conversationType === 'group') {
                    this.$store.getters.GetCurrentGroupAdmins.forEach((e) => {
                        admins.push(e._id)
                    })
                    permissions = this.$store.getters.GetUserPermissions
                }
                this.$socket.emit_media({
                    room: this.$store.getters.GetCurrentRoom,
                    sender: {
                        name: this.$store.getters.getUser.name,
                        id: this.$store.getters.getUser._id
                    },
                    admins: admins,
                    permissions: permissions,
                    receiver: {
                        name: this.$store.getters.GetCurrentRecipient.name,
                        id: this.$store.getters.GetCurrentRecipient.id
                    },
                    message_type: conversationType,
                    text: '',
                    media: {
                        type: fileData.media_types,
                        location: fileData.filenames
                    },
                    sentAt: 'Now'
                })
                this.messages.push({
                    sender: {
                        id: this.$store.getters.getUser._id,
                        name: this.$store.getters.getUser.name
                    },
                    media: {
                        type: fileData.media_types,
                        location: fileData.filenames
                    },
                    message_type: 'media',
                    text: '',
                    sentAt: "Now"
                })
            },
            sendMessage(msg_type) {
                let user = this.$store.getters.getUser
                let reciever = this.$store.getters.GetCurrentRecipient
                this.messages.push({
                    sender: {
                        id: user._id,
                        name: user.name
                    },
                    media: {
                        type: [],
                        location: []
                    },
                    message_type: 'text',
                    text: this.$refs.msgText.value,
                    sentAt: "Now"
                })
                this.$socket.emit({
                    room: this.$store.getters.GetCurrentRoom,
                    sender: {
                        name: user.name,
                        id: user._id
                    },
                    receiver: {
                        name: reciever.name,
                        id: reciever.id
                    },
                    message_type: msg_type,
                    text: this.$refs.msgText.value,
                    media: {
                        type: [],
                        location: []
                    },
                    sentAt: 'Now'
                })
                this.$refs.msgText.value = ""
            },
            async updateRequestStatus(event, request) {
                let id = event.currentTarget.id.split("-")[1]
                let status = event.currentTarget.id.split("-")[0]
                this.pendingApprovals = this.pendingApprovals.filter((obj) => {
                    return obj._id != id
                })
                await this.$store.dispatch('UpdatePendingRequestStatus', {
                    groupId: this.$store.getters.GetCurrentRecipient.id,
                    status: event.currentTarget.id
                })
            },
            async getRemainingUserList() {
                this.userContacts = this.$store.getters.getUser.contacts
                await this.$store.dispatch('GetGroupMembers', this.$store.getters.GetCurrentRecipient.id)
                this.existingMemberIds = this.$store.getters.GetGroupMembers.map(e => e._id)
                this.userContacts = this.userContacts.filter(e => !this.existingMemberIds.includes(e._id))
            },
            async addMembersToGroup() {
                await this.$store.dispatch('UpdateGroupMembers', {
                    groupId: this.$store.getters.GetCurrentRecipient.id,
                    newMembers: this.selectedMembers
                })
                this.selectedMembers = []
            }
        },
        computed: {
            classListOverlay() {
                if (this.$store.getters.GetMessageAreaState)
                    return "w-100 h-100 overlay d-none  "
                else
                    return "w-100 h-100 overlay"
            },
            classListInput() {
                let permissions = this.$store.getters.GetUserPermissions
                if (this.$store.getters.GetMessageAreaState) {
                    if ((this.conversationType === 'group' && permissions.ReadOnly === false) || this.conversationType === 'individual') {
                        return "d-flex justify-self-end align-items-center flex-row"
                    }
                }
                return "d-none justify-self-end align-items-center flex-row"
            },
            classListAttachment() {
                let permissions = this.$store.getters.GetUserPermissions
                if (this.conversationType === 'group' && (permissions.BlockUploads === true || permissions.ReadOnly === true))
                    return "d-none"
                return ""
            },
            currentUser() {
                return this.$store.getters.getUser
            },
            currentRecipient() {
                return this.$store.getters.GetCurrentRecipient
            },
            async conversations() {
                await this.$store.dispatch('GetConversationBetweenUsers', {
                    id_a: this.$store.getters.getUser._id,
                    id_b: this.$store.getters.GetCurrentRecipient.id
                })
            }
        }
    }
</script>

<style scoped>
    .list_media {
        width: 20px;
        height: 20px;
        margin-top: 12px;
    }

    .list_media:hover {
        transform: scale(1.8);
    }

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
        -webkit-box-shadow: 0px 4px 7px -1px rgba(0, 0, 0, 0.55);
        -moz-box-shadow: 0px 4px 7px -1px rgba(0, 0, 0, 0.55);
        box-shadow: 0px 4px 7px -1px rgba(0, 0, 0, 0.55);
    }

    #input-area #input {
        outline: none;
    }

    .message-item {
        position: relative;
        max-width: 55%;
        word-break: break-word;
        border-radius: 30px !important;
        padding: 4px 10px !important;
        font-size: 90%;
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    }

    .message-item.self {
        background: #caf2f7 !important;
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
        background: #43C6AC;
        background: -webkit-linear-gradient(to right, #191654, #43C6AC);
        background: linear-gradient(to left, #191654, #43C6AC);
    }

    .upload_media {
        width: 40px;
        height: 40px;
    }
</style>