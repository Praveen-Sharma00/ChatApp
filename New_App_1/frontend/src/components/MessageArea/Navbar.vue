<template>
    <!-- Navbar -->
    <div class="row d-flex flex-row align-items-center p-2 m-0 w-100" id="navbar">
        <div class="d-block d-sm-none">
            <i class="fas fa-arrow-left p-2 mr-2 text-white" style="font-size: 1.5rem; cursor: pointer;"
               onclick="showChatList()"></i>
        </div>
        <a href="#"><img src="https://via.placeholder.com/400x400" alt="Profile Photo"
                         class="img-fluid rounded-circle mr-2" style="height:50px;" id="pic"></a>
        <div class="d-flex flex-column">
            <div clasdetailss="text-white font-weight-bold" id="name"></div>
            <div class="text-white small" id="details"></div>
        </div>
        <div class="d-flex flex-row align-items-center ml-auto">
            <a href="#"><i class="fas fa-search mx-3 text-white d-none d-md-block"></i></a>
            <a href="#"><i class="fas fa-paperclip mx-3 text-white d-none d-md-block"></i></a>
            <a href="#"><i class="fas fa-ellipsis-v mr-2 mx-sm-3 text-white"></i></a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Navbar_2"
    }
</script>

<style  >
    #navbar #details {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>