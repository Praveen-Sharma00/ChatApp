<template>
    <div>
        <!--        <template v-if="Object.keys(this._CurrentRecipient).length === 0 && this._CurrentRecipient.constructor === Object">-->
        <!--           <div id="overlay" class="container" style="background: red" >-->
        <!--               <div class="row">-->
        <!--                   <div class="col-sm-8">-->
        <!--                       <div class="card">-->
        <!--                           hello-->
        <!--                       </div>-->
        <!--                   </div>-->
        <!--               </div>-->
        <!--           </div>-->
        <!--        </template>-->
        <template>
            <div id="content" class="tab-content" role="tablist">
                <div
                        id="pane-A"
                        class="card tab-pane fade show active"
                        role="tabpanel"
                        aria-labelledby="tab-A">
                    <div class="card-header" role="tab" id="heading-A">
                        <h5 class="mb-0">
                            <a
                                    data-toggle="collapse"
                                    href="#collapse-A"
                                    data-parent="#content"
                                    aria-expanded="true"
                                    aria-controls="collapse-A"
                            >Collapsible Group Item A</a>
                        </h5>
                    </div>
                    <div id="collapse-A" class="collapse show" role="tabpanel" aria-labelledby="heading-A">
                        <div class="message-area">
                            <div class="message-area-nav">
                                <div class="row">
                                    <div class="col-sm-6">
                                        <div class="chat-body-div">
                                            <div class="d-flex align-items-center">
                                                <div class="chat-body-img">
                                                    <img src="@/assets/images/75.jpg" alt/>
                                                </div>
                                                <div class="chat-body-user-inf d-flex align-items-center pl-4">
                                                    <h2>{{_CurrentRecipient.name}}</h2>

                                                    <p class="pl-2">
                                                        <span class="dot-chat pl-2"></span> Online
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6 d-flex align-items-center justify-content-end">
                                        <div class="chat-body-dots">
                                            <template v-if="(_CurrentConversationType==='group' && !_CurrentUserPermissions['ReadOnly']) || (_CurrentConversationType==='individual')">
                                                <i class="navbar-icons fas fa-paperclip pl-2" title="Send a file"></i>
                                            </template>
                                            <template v-if="(_CurrentConversationType==='group' && _CurrentUserPermissions['isAdmin'])">
                                                <i class="navbar-icons fas fa-user-plus  pl-3"
                                                   title="Add members to group"></i>
                                                <i class="navbar-icons fas fa-clock pl-3"
                                                   title="Pending upload approvals"></i>
                                            </template>


                                            <!--                                            <button class="button-chat sub-menu4">-->
                                            <!--                                                <i class="fas fas-dot-chat fa-ellipsis-v"></i>-->
                                            <!--                                            </button>-->
                                            <!--                                            <ul class="dropdown-ul4 dropdown-ul-n12">-->
                                            <!--                                                <li>-->
                                            <!--                                                    <a href="#">Delete Conversation</a>-->
                                            <!--                                                </li>-->
                                            <!--                                                <li>-->
                                            <!--                                                    <a href="#">Option 1</a>-->
                                            <!--                                                </li>-->
                                            <!--                                                <li>-->
                                            <!--                                                    <a href="#">Option 2</a>-->
                                            <!--                                                </li>-->
                                            <!--                                                <li>-->
                                            <!--                                                    <a href="#">Option 3</a>-->
                                            <!--                                                </li>-->
                                            <!--                                            </ul>-->
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="message-area-body">
                                <template v-for="msg in _CurrentConversation">

                                    <!-- LEFT -->
                                    <div class="row" v-if="msg.sender._id!==_CurrentUser._id">
                                        <div class="col-sm-8 d-flex align-items-center mt-3">
                                            <div class="d-flex align-items-center">
                                                <div class="body-chat-div-text pl-4">
                                                    <h6>
                                                        <span class="chat-pill-uname">{{msg.sender.name}}</span>
                                                        <br>
                                                        <template v-if="msg.message_type==='text'">{{msg.text}}
                                                        </template>
                                                        <template v-else-if="msg.message_type==='media'">
                                                            <template v-for="(type,index) in msg.media.type">
                                                                <template v-if="type==='pdf'">
                                                                    <a :href="_BASE_URL+'/uploads/'+msg.media.location[index]">
                                                                        <i class="far fa-file-pdf"></i>
                                                                    </a>
                                                                </template>
                                                                <template v-else-if="type==='doc'">
                                                                    <a :href="_BASE_URL+'/uploads/'+msg.media.location[index]">
                                                                        <i class="far fa-file-word"></i>
                                                                    </a>
                                                                </template>
                                                                <template v-else-if="type==='image'">
                                                                    <a :href="_BASE_URL+'/uploads/'+msg.media.location[index]">
                                                                        <i class="far fa-file-image"></i>
                                                                    </a>
                                                                </template>
                                                            </template>
                                                        </template>
                                                    </h6>
                                                    <br>
                                                    <small>{{msg.sentAt}}</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!--END LEFT -->

                                    <!-- RIGHT -->
                                    <div class="row justify-content-end" v-else>
                                        <div class="col-sm-8 d-flex align-items-center justify-content-end mt-3">
                                            <div class="d-flex align-items-center">
                                                <div class="body-chat-div-text pl-4 sender">
                                                    <h6>
                                                        <span class="chat-pill-uname">You</span>
                                                        <br>
                                                        <template v-if="msg.message_type==='text'">{{msg.text}}
                                                        </template>
                                                        <template v-else-if="msg.message_type==='media'">
                                                            <template v-for="(type,index) in msg.media.type">
                                                                <template v-if="type==='pdf'">
                                                                    <a :href="_BASE_URL+'/uploads/'+msg.media.location[index]">
                                                                        <i class="far fa-file-pdf"></i>
                                                                    </a>
                                                                </template>
                                                                <template v-else-if="type==='doc'">
                                                                    <a :href="_BASE_URL+'/uploads/'+msg.media.location[index]"><i
                                                                            class="far fa-file-word"></i></a>
                                                                </template>
                                                                <template v-else-if="type==='image'">
                                                                    <a :href="_BASE_URL+'/uploads/'+msg.media.location[index]"><i
                                                                            class="far fa-file-image"></i></a>
                                                                </template>
                                                            </template>
                                                        </template>
                                                    </h6>
                                                    <small>{{msg.sentAt}}</small><br>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- END RIGHT-->

                                </template>
                            </div>
                            <div class="chat-input-container container-fluid">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="input-group mb-3">
                                            <input
                                                    type="text"
                                                    class="form-control msg-input"
                                                    placeholder="Type your message"
                                                    aria-describedby="button-addon2"
                                            />
                                            <div class="input-group-append">
                                                <button
                                                        class="btn btn-primary send-msg-btn"
                                                        type="button"
                                                        id="button-addon2"
                                                >
                                                    <i class="fas fa-paper-plane"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    import {eventBus} from "../../../main";
    import chatDataMixin from "../../../mixins/chatDataMixin";

    export default {
        name: "MessageArea",
        mixins: [chatDataMixin],
        data() {
            return {
                messages: []
            }
        },
        mounted() {
            eventBus.$on('load-conversations', async (type) => {
                if (type === 'individual') {
                    await this.getConversationBetweenUsers(
                        this._CurrentUser._id,
                        this._CurrentRecipient._id
                    )
                } else {
                    await this.getGroupConversations(
                        this._CurrentRecipient._id
                    )
                }
                if (this._CurrentConversation) {
                    this.messages = this._CurrentConversation.length > 0 ? this._CurrentConversation : []
                }
                console.log("MESSAGES : ", this.messages)
            })
        }
    }
</script>

<style scoped>
@import "msg-area.css";
</style>