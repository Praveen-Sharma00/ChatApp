<template>
    <div class="row" id="chat-list" >
        <div :id="contact.id+','+contact.name" class="chat-list-item d-flex flex-row w-100 p-2 border-bottom" v-for="contact in getUserContacts()" @click="showMessageArea(contact)"  >
            <img :src="contact.imageUrl"
                 alt="Profile Photo" class="img-fluid rounded-circle mr-2" style="height:50px;">
            <div class="w-50">
                <div class="name" >{{contact.name}}</div>
                <div class="small last-message">+91 9876512345 : Some message ...<i class=" fa-check-circle mr-1"></i>
                </div>
            </div>
            <div class="flex-grow-1 text-right">
                <div class="small time">28/03/2018</div>
                <div class="badge badge-success badge-pill small" id="1">2</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ContactList",

        methods:{
            showMessageArea(contact){
                this.$store.commit('SetMessageAreaState',true)
                this.$store.commit('SetRecipientDetails',{id:contact.id,name:contact.name,imageUrl:contact.imageUrl})
            },
            getUserContacts(){
                return this.$store.state.userContacts
            }
        },
        mounted() {
            this.$store.dispatch('fetchUserContacts')
        }
    }
</script>

<style >
    #chat-list {
        overflow: auto;
        max-height:85vh;
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