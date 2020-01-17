<template>
    <div id="app">
        <div class="container">
            <div class="row h-100">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import Login from "./components/Login";
    import Signup from "./components/Signup";
    export default {
        components: {
            'login':Login,
            'signup':Signup
        }
    }
</script>
