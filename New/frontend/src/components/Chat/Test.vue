<template>
    <p>{{getUser}}</p>
</template>

<script>
    export default {
        name: "Test",
        computed:{
            getUser(){
                return this.$store.getters.getUser
            }
        }
    }
</script>

<style scoped>

</style>