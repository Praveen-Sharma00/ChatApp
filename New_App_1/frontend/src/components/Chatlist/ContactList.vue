<template>
    <!-- Chat List -->
    <div class="row" id="chat-list">

    </div>
</template>

<script>
    export default {
        name: "ContactList"
    }
</script>

<style >
    #chat-list {
        overflow: auto;
    }

    .chat-list-item {
        background: white;
        cursor: pointer;
    }

    .chat-list-item:hover {
        background: hsl(0, 0%, 95%);
    }

    .chat-list-item:active {
        background: hsl(0, 0%, 85%);
    }

    .chat-list-item.active {
        background: hsl(0, 0%, 90%);
    }

    .chat-list-item .chat-details {
        width: 60%;
    }

    .chat-list-item.unread .name,
    .chat-list-item.unread .last-message {
        font-weight: bold;
    }

    .chat-list-item .last-message {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

</style>