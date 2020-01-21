<template>
    <div class="row" id="chat-list">
        <div :id="contact.id+','+contact.name"
             :class="['chat-list-item','d-flex', 'flex-row','w-100', 'p-2', 'border-bottom',contact.id==activeItem?'active':'']"
             v-for="contact in getUserContacts()"
             @click="showMessageArea(contact)">
            <img :src="contact.imageUrl"
                 alt="Profile Photo" class="img-fluid rounded-circle mr-2" style="height:50px;">
            <div class="w-50">
                <div class="name">{{contact.name}}</div>
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
    import {eventBus} from "../../main";

    export default {
        name: "ContactList",
        data() {
            return {
                activeItem: ''
            }
        },
        methods: {
            showMessageArea(contact) {
                this.$store.commit('SetMessageAreaState', true)
                this.activeItem = contact.id
                this.$store.commit('SetRecipientDetails', {
                    id: contact.id,
                    name: contact.name,
                    imageUrl: contact.imageUrl
                })
                eventBus.$emit('load-conversations', contact.id)
            },
            getUserContacts() {
                return this.$store.state.user.contacts
            }
        },
        mounted() {
            this.$store.dispatch('fetchUserContacts')
        }
    }
</script>

<style>
    #chat-list {
        overflow: auto;
        max-height: 85vh;
    }

    .chat-list-item {
        margin-bottom: 3px;
        background: white;
        cursor: pointer;
        /*border-radius: 30px;*/

    }


    .chat-list-item:hover {
        background: hsl(0, 0%, 95%);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    }

    .chat-list-item:active {
        background: hsl(0, 0%, 85%);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

    }

    .chat-list-item.active {
        background: hsl(0, 0%, 90%);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
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