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
                                            <button class="button-chat sub-menu4">
                                                <i class="fas fas-dot-chat fa-ellipsis-v"></i>
                                            </button>
                                            <ul class="dropdown-ul4 dropdown-ul-n12">
                                                <li>
                                                    <a href="#">Delete Conversation</a>
                                                </li>
                                                <li>
                                                    <a href="#">Option 1</a>
                                                </li>
                                                <li>
                                                    <a href="#">Option 2</a>
                                                </li>
                                                <li>
                                                    <a href="#">Option 3</a>
                                                </li>
                                            </ul>
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
                                                                    <a :href="_BASE_URL+'/uploads/'+msg.media.location[index]"><img
                                                                            class="uploaded_media"
                                                                            src="@/assets/images/pdf.png"></a>
                                                                </template>
                                                                <template v-else-if="type==='doc'">
                                                                    <a :href="_BASE_URL+'/uploads/'+msg.media.location[index]"><img
                                                                            class="uploaded_media"
                                                                            src="@/assets/images/doc.png"></a>
                                                                </template>
                                                                <template v-else-if="type==='image'">
                                                                    <a :href="_BASE_URL+'/uploads/'+msg.media.location[index]"><img
                                                                            class="uploaded_media"
                                                                            src="@/assets/images/pic.png"></a>
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
                                                                    <a :href="_BASE_URL+'/uploads/'+msg.media.location[index]">PDF</a>
                                                                </template>
                                                                <template v-else-if="type==='doc'">
                                                                    <a :href="_BASE_URL+'/uploads/'+msg.media.location[index]">docx</a>
                                                                </template>
                                                                <template v-else-if="type==='image'">
                                                                    <a :href="_BASE_URL+'/uploads/'+msg.media.location[index]">Image</a>
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
    .chat-input-container {
        position: absolute;
        bottom: -13px !important;
        min-width: 95%;
        max-width: 95%;

        /* margin: 0; */
        box-sizing: content-box;
        min-height: 70px;
        /* margin-bottom:10px; */
        margin: 0 auto !important;
    }

    .msg-input {
        border-radius: 25px !important;
        z-index: 2000;
        height: 47px;
        padding: 10px 20px 10px 25px !important;
        box-sizing: border-box;
        color: rgba(0, 0, 0, 0.87);
        font-size: 12px;
        -webkit-box-shadow: 0px 1px 3px 0px rgba(181, 181, 181, 1);
        -moz-box-shadow: 0px 1px 3px 0px rgba(181, 181, 181, 1);
        box-shadow: 0px 1px 3px 0px rgba(181, 181, 181, 1);
    }

    .msg-input:focus {
        outline: none;
        -webkit-box-shadow: none !important;
        -moz-box-shadow: none !important;
        box-shadow: none !important;
        background: #f7f7f7;
    }

    .send-msg-btn {
        margin-left: -50px !important;
        border-radius: 25px !important;
        z-index: 2001 !important;
        width: 60px;
    }

    .send-msg-btn:hover {
        transform: scale(1.1);
        transition: all 0.3s ease-in-out;
    }

    .tab-pane {
        background: #ffffffed !important;
        border-radius: unset !important;
        box-shadow: unset !important;
        height: 600px !important;
    }

    .msg_send_btn {
        background: #05728f none repeat scroll 0 0;
        border: medium none;
        border-radius: 50%;
        color: #fff;
        cursor: pointer;
        font-size: 14px;
        height: 25px;
        position: absolute;
        right: 13px;
        /* top: 11px; */
        width: 26px;
        bottom: 38px;
    }

    .chat-pill-uname {
        color: rgb(119, 119, 119);
        font-size: 12px;
        font-weight: 600;
    }

    .message-area-body {
        height: 460px;
        min-width: 780px;
        max-width: 780px;
        position: relative;
        overflow: hidden;
        overflow-y: scroll;
    }

    .message-area-body::-webkit-scrollbar {
        width: 8px;
        background-color: #F5F5F5;
    }

    .message-area-body::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        background-color: #F5F5F5;
    }

    .message-area-body::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        background-color: #555;
    }

    .message-area-body::-webkit-scrollbar-thumb:hover {
        background: #cbcbcb;
    }

    .uploaded_media {
        width: 45px;
        height: 45px;
    }

    .uploaded_media:hover {
        transform: scale(1.08);
        transition: all 0.1s ease-in-out;
    }

    .message-area-nav {
        margin-bottom: 20px;
        min-height: 40px !important;
        padding: 8px;
        background-color: rgb(226, 220, 220);
        margin: 0;

        -webkit-box-shadow: 0px 1px 5px -1px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 0px 1px 5px -1px rgba(0, 0, 0, 0.75);
        box-shadow: 0px 1px 5px -1px rgba(0, 0, 0, 0.75);
    }

    div#content {
        width: 100%;
        height: 600px;
    }

    .body-chat-div-text.pl-4 h6 {
        box-shadow: 0px 1px 3px 0px rgba(80, 80, 80, 0.2),
        0px 1px 1px 0px rgba(80, 80, 80, 0.14),
        0px 2px 1px -1px rgba(80, 80, 80, 0.12);
        background-color: #f3e5f5;
        display: inline-block;
        padding: 10px;
        border-radius: 10px;
        border-top-left-radius: 0;
        margin-top: 2px;
    }

    .body-chat-div-text.pl-4 h6:after {
        top: 21;
        left: 16px;
        content: "";
        position: absolute;
        border-right: 10px solid #f3e5f5;
        border-bottom: 15px solid transparent;
    }

    .body-chat-div-text.pl-4 {
        position: relative;
    }

    .body-chat-div-text.pl-4.sender h6 {
        background: #fff3e0;
        border-top-right-radius: 0;
    }

    .body-chat-div-text.pl-4.sender h6:after {
        right: 0;
        border-right: 10px solid #fff3e0;
    }

    .body-chat-div-text small {
        color: #00000063;
    }

    .chat-body-user-inf h2 {
        font-size: 1.25rem;
        font-family: Open Sans, sans-serif;
        font-weight: 600;
        line-height: 1.6;
        margin-bottom: 0;
    }

    span.dot-chat {
        width: 10px;
        border: 1px solid #fff;
        height: 10px;
        display: inline-block;
        margin-right: 2px;
        border-radius: 50%;
        background: #cddc39;
    }

    .card .collapse {
        display: block;
    }

    @media (max-width: 767px) {
        .tab-pane {
            display: block !important;
            opacity: 1;
        }
    }

    .chat-img img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }

    .chat-user {
        padding-left: 14px;
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

    ul.dropdown-ul4.dropdown-ul-n12 {
        padding-left: 0;
        background: #fff;
        display: none;
        position: absolute;
        right: 11px;
        top: 48px;
        border-radius: 4px;
    }

    ul.dropdown-ul4.dropdown-ul-n12 li {
        list-style-type: none;
        padding: 10px 20px;
    }

    ul.dropdown-ul4.dropdown-ul-n12 li {
        list-style-type: none;
        padding: 4px 20px;
        color: gray;
    }

    ul.dropdown-ul4.dropdown-ul-n12 a {
        color: gray;
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

    input.form-control.search-text {
        border-radius: 18px;
        position: absolute;
        bottom: 30px;
    }

    button.button-chat {
        background: none;
        border: none;
    }

    @media (min-width: 768px) {
        .card {
            border: none;
        }

        .card .card-header {
            display: none;
        }
    }

    .chat-body-user-inf.d-flex p {
        font-size: 12px;
        color: #00000082;
        margin-bottom: -3px;
    }

    #overlay {
        background: #0a6ebd !important;
    }

</style>