<template>
    <div class="row d-flex flex-row align-items-center p-2 m-0 w-100" id="navbar">
        <div class="d-block d-sm-none">
            <i class="fas fa-arrow-left p-2 mr-2 text-white" style="font-size: 1.5rem; cursor: pointer;"
               onclick="showChatList()"></i>
        </div>
        <a href="#">
            <img :src="getRecipientImage" alt="Profile Photo" class="img-fluid rounded-circle mr-2"
                 style="height:50px;" id="pic">
        </a>
        <div class="d-flex flex-column">
            <div class="details text-white font-weight-bold" id="name" >{{getRecipientName}}</div>
            <div class="text-white small" id="details"></div>
        </div>
        <div class="d-flex flex-row align-items-center ml-auto">
            <a href="#"><i class="fas fa-paperclip mx-3 text-white d-none d-md-block"></i></a>
            <a href="#"><i class="fas fa-ellipsis-v mr-2 mx-sm-3 text-white"></i></a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Navbar_2",
        data(){
            return{
                id:0,name:'',imageUrl:''
            }
        },
        computed:{
            getRecipientName(){
                return this.$store.state.currentRecipient.name
            },
            getRecipientId(){
                return this.$store.state.currentRecipient.id
            },
            getRecipientImage(){
                return this.$store.state.currentRecipient.imageUrl
            }
        }
    }
</script>

<style scoped>
    #navbar {
        background: #009688;
    }
</style>