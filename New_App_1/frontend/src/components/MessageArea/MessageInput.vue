<template>
    <!-- Input -->
    <div class="d-none justify-self-end align-items-center flex-row" id="input-area">
        <a href="#"><i class="far fa-smile text-muted px-3" style="font-size:1.5rem;"></i></a>
        <input type="text" name="message" id="input" placeholder="Type a message"
               class="flex-grow-1 border-0 px-3 py-2 my-3 rounded shadow-sm">
        <i class="fas fa-paper-plane text-muted px-3" style="cursor:pointer;"
           onclick="sendMessage()"></i>
    </div>
</template>

<script>
    export default {
        name: "MessageInput"
    }
</script>

<style >
</style>