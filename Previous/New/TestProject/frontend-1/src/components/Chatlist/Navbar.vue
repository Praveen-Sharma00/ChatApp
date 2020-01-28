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
                <a class="dropdown-item" @click="showProfileSettings()">Settings</a>
                <a class="dropdown-item" href="#">Log Out</a>
            </div>
        </div>
    </div>
</template>
<script>
    import {eventBus} from "../../main";

    export default {
        name: "Navbar_1",
        methods: {
            showProfileSettings() {
                eventBus.$emit("show-profile-settings")
            }
        }
    }
</script>
<style scoped>
    #navbar {
        /*background: #009688;*/
        background: #2C3E50;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #4CA1AF, #2C3E50);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #4CA1AF, #2C3E50); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    }

    .dropdown-toggle::after {
        display: none;
    }
</style>