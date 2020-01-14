<template>
    <!-- Chat List -->
    <div class="row" id="chat-list">
        <div class="chat-list-item d-flex flex-row w-100 p-2 border-bottom" onclick="generateMessageArea()">
            <img src="https://p7.hiclipart.com/preview/4/1012/949/github-bitbucket-fork-software-repository-icons-for-windows-github-logo.jpg" alt="Profile Photo" class="img-fluid rounded-circle mr-2" style="height:50px;">
            <div class="w-50">
                <div class="name">Rohit verma</div>
                <div class="small last-message">+91 9876512345 : Some message ...<i class=" fa-check-circle mr-1"></i> </div>
            </div>
            <div class="flex-grow-1 text-right">
                <div class="small time">28/03/2018</div>
                <div class="badge badge-success badge-pill small" id="1"></div>
        </div>
    </div>
    </div>
</template>

<script>
    export default {
        name: "ContactList"
    }
</script>

<style scoped>
    #chat-list{
        overflow:auto;
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