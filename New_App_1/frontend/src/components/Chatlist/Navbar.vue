<template>
    <!-- Navbar -->
    <div class="row d-flex flex-row align-items-center p-2" id="navbar">
        <img alt="Profile Photo" class="img-fluid rounded-circle mr-2" style="height:50px; cursor:pointer;"
             onclick="showProfileSettings()" id="display-pic">
        <div class="text-white font-weight-bold" id="username"></div>
        <div class="nav-item dropdown ml-auto">
            <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true"
               aria-expanded="false"><i class="fas fa-ellipsis-v text-white"></i></a>
            <div class="dropdown-menu dropdown-menu-right">
                <a class="dropdown-item" href="#">New Group</a>
                <a class="dropdown-item" href="#">Archived</a>
                <a class="dropdown-item" href="#">Starred</a>
                <a class="dropdown-item" href="#">Settings</a>
                <a class="dropdown-item" href="#">Log Out</a>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "Navbar_1"
    }
</script>
<style >
</style>