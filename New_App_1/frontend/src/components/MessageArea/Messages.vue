<template>
    <!-- Messages -->
    <div class="d-flex flex-column" id="messages">
    </div>
</template>

<script>
    import {eventBus} from "../../main";

    export default {
        name: "Messages",
        mounted() {
            eventBus.$on("show-message-area",()=>{

            })
        }
    }
</script>

<style >
</style>