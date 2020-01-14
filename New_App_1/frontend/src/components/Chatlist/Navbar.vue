<template>
    <!-- Navbar -->
    <div class="row d-flex flex-row align-items-center p-2" id="navbar">
        <img alt="Profile Photo"
             class="img-fluid rounded-circle mr-2"
             style="height:50px; cursor:pointer;"
             @click="showProfileSettings()"
             id="display-pic"
                src="https://p7.hiclipart.com/preview/4/1012/949/github-bitbucket-fork-software-repository-icons-for-windows-github-logo.jpg">
        <div class="text-white font-weight-bold" id="username">Some name</div>
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
        name: "Navbar_1",
        methods:{
            showProfileSettings(){
                alert("hi")
            }
        }
    }
</script>
<style scoped>
    #navbar {
        background: #009688;
    }
    .dropdown-toggle::after {
        display: none;
    }
</style>