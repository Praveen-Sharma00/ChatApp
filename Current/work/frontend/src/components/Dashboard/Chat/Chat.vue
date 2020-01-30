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
        <ul id="tabs" class="nav nav-tabs chat-tab fadeIn" role="tablist">
          <div class="active-pink-3 active-pink-4 mb-2">
            <input
              class="form-control search-f"
              type="text"
              placeholder="Search"
              aria-label="Search"
            />
            <span>6 Contacts</span>
          </div>

          <li class="nav-item">
            <a id="tab-A" href="#pane-A" class="nav-link active" data-toggle="tab" role="tab">
              <div class="d-flex align-items-center">
                <div class="chat-img">
                  <img src="@/assets/images/75.jpg" alt />
                </div>
                <div class="chat-user align-items-center">
                  <h6>James Deo</h6>
                  <p>Admininstrator</p>
                </div>
              </div>
            </a>
          </li>
        </ul>
        <div class="contact-all">
          <div class="row w-100 justify-content-center">
            <div class=" col-sm-4 tab-title text-center fav-con active">
              <i class="fas fa-user" ></i>
              Individual
            </div>
            <!-- <div class="col-sm-1"></div> -->
            <div class=" col-sm-4 tab-title text-center fav-con">
              <i class="fas fa-users"></i>
Group
            </div>
          </div>
        </div>
        <div id="content" class="tab-content" role="tablist">
          <div
            id="pane-A"
            class="card tab-pane fade show active"
            role="tabpanel"
            aria-labelledby="tab-A"
          >
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
                            <img src="@/assets/images/75.jpg" alt />
                          </div>
                          <div class="chat-body-user-inf d-flex align-items-center pl-4">
                            <h2>James Deo</h2>

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
                  <!-- LEFT -->
                  <div class="row">
                    <div class="col-sm-12 d-flex align-items-center mt-3">
                      <div class="d-flex align-items-center">
                        <div class="body-chat-div-img">
                          <img src="@/assets/images/75.jpg" alt />
                        </div>
                        <div class="body-chat-div-text pl-4">
                          <small>May 29, 2019 04:15 Pm</small>
                          <br />
                          <h6>Some text here</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--END LEFT -->
                  <!-- RIGHT -->
                  <div class="row">
                    <div class="col-sm-12 d-flex align-items-center justify-content-end mt-3">
                      <div class="d-flex align-items-center">
                        <div class="body-chat-div-img">
                          <img src="@/assets/images/75.jpg" alt />
                        </div>
                        <div class="body-chat-div-text pl-4 left">
                          <small>May 29, 2019 04:15 Pm</small>
                          <br />
                          <h6>Lorem ipsum dolor sit amet</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- END RIGHT-->
                </div>
                <div class="chat-input-container container-fluid">
                  <div class="row">
                    <div class="col-12">
                      <!-- <div class="active-pink-3 active-pink-41 mt-3">
                        <input
                          class="form-control search-text"
                          type="text"
                          placeholder="Type a Message"
                          aria-label="Search"
                        />
                        <button class="msg_send_btn">
                          <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
                        </button>
                      </div>-->

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

                  <!-- <div class="col-11 mx-auto">
                   
                  </div>-->
                </div>
              </div>
            </div>
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
/*.main-2-div {*/
/*    margin-top: -2px;*/
/*}*/
/*.container-fluid{*/
/*    width:95% !important;*/
/*}*/
/*.chat-card {*/
/*    margin-top: -35px !important;*/
/*    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);*/
/*    background: #fff;*/
/*    border-radius: 12px;*/
/*    max-height: 100vh;*/
/*    min-height: 90vh;*/
/*    opacity: 0.98;*/
/*}*/

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

  .card {
    border: none;
  }

  .card .card-header {
    display: none;
  }

  .card .collapse {
    display: block;
  }
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
div#content {
  width: 100%;
  height: 600px;
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
.chat-body-user-inf.d-flex p {
  font-size: 12px;
  color: #00000082;
  margin-bottom: -3px;
}
button.button-chat {
  background: none;
  border: none;
}
.body-chat-div-img img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
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
.body-chat-div-text.pl-4.left h6 {
  background: #fff3e0;
  border-top-right-radius: 0;
}
.body-chat-div-text.pl-4.left h6:after {
  right: 0;
  border-right: 10px solid #fff3e0;
}
.body-chat-div-text small {
  color: #00000063;
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
.message-area-body {
  height: 460px;
  position: relative;
  overflow: hidden;
  overflow-y: scroll;
}
input.form-control.search-f {
  border-radius: 16px;
  width: 90%;
  margin: 0 auto;
}
.active-pink-3.active-pink-4 span {
  color: #80808082;
  display: flex;
  justify-content: center;
  /* margin-top: 5px; */
}
.chat-user.align-items-center p {
  margin-bottom: 0px;
}
input.form-control.search-text {
  border-radius: 18px;
  position: absolute;
  bottom: 30px;
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
.active-pink-3.active-pink-41.mt-3 {
  overflow: hidden;
}
.chat-user.align-items-center h6 {
  color: #00000091;
  margin-bottom: 2px;
}
.chat-user.align-items-center p {
  color: #00000091;
}
.tab-pane {
  background: #ffffffed !important;
  border-radius: unset !important;
  box-shadow: unset !important;
  height: 600px !important;
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
.chat-tab a {
  padding: 10px 20px;
}

.contact-all {
  position: absolute;
  bottom: 0px;
  width: 28%;
  height: 70px;
  padding-top: 10px;
  font-size:12px;
 
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
.contact-all .tab-title{
    padding-top:4px;
}
.contact-all .tab-title:hover{
   background: rgb(235, 233, 233);
   cursor: pointer;
}
.contact-all .active{
    background: rgb(206, 204, 204);
}
.contact-all a {
  text-decoration: none;
}
.contact-all .tab-active {
  background: red !important;
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

.chat-input-container {
  position: absolute;
  bottom: -13px !important;
  min-width: 95%;
  max-width: 95%;

  /* margin: 0; */
  box-sizing: content-box;
  min-height: 70px;
  /* margin-bottom:10px; */
  margin: 0 auto !important ;
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
</style>