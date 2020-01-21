<template>
    <div class="container-fluid">
        <p>{{getUser}}</p>
    </div>
</template>

<script>
    export default {
        name: "Test",
        computed:{
            getUser(){
                return this.$store.getters.getUser
            }
        },
        beforeCreate() {
            document.body.className=""
        }
    }
</script>

<style scoped>

</style>