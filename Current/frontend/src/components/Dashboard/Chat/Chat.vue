<template>
  <div class="container-fluid" >
    <div class="card d-flex" id="main-container">
      <div class="row h-100 ">
        <div class="col-sm-4 chatlist">
          <chat-list></chat-list>
        </div>
        <div class="col-sm-8 msg-area">
          <message-area></message-area>
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

<style scoped >
.card {
  margin-top: -37px !important;
  height: 90vh;
  width: 100%;
  background: #f6f6f6 !important;
  border-radius: 8px;
  box-shadow: 0px 1px 3px 0px rgba(142, 142, 142, 0.2),
    0px 1px 1px 0px rgba(243, 243, 243, 0.14),
    0px 2px 1px -1px rgba(204, 204, 204, 0.12);
  opacity: 0.9;
}
chat-list {
  width: 40%;
}
.chatlist{
    background-color: red;
}
.msg-area{
    background-color: gray;
}
message-area {
  width: 60%;
}
#main-container{
    padding: 15px;
}
</style>