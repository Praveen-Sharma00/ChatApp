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
            <div class="details text-white font-weight-bold" id="name">{{getRecipientName}}</div>
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
        data() {
            return {
                id: 0, name: '', imageUrl: ''
            }
        },
        computed: {
            getRecipientName() {
                return this.$store.state.currentRecipient.name
            },
            getRecipientId() {
                return this.$store.state.currentRecipient.id
            },
            getRecipientImage() {
                return this.$store.state.currentRecipient.imageUrl
            }
        }
    }
</script>

<style scoped>
    #navbar {
        /*background: #009688;*/
        /*background-image: linear-gradient(to left bottom, #dee5e7, #76c9f2, #00a4ff, #0075ff, #5225f6);*/
        /*background-image: linear-gradient(to left bottom, #dee5e7, #99a9b3, #5d7083, #2d3a55, #0a0227);*/
        background: #43C6AC;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #191654, #43C6AC);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to left, #191654, #43C6AC); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    }
</style>