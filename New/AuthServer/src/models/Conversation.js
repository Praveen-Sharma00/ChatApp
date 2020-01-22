const mongoose = require('mongoose')

const conversationSchema = new mongoose.Schema({
    between_users: [mongoose.Schema.Types.ObjectId],
    group_id: mongoose.Schema.Types.ObjectId,
    conversation_type: {
        type: Number
    },
    messages: [{
        text: String,
        message_type: {
            type: String,
            enum: ["text", "media"]
        },
        media: {
            type: {
                type: String,
                enum: ["image", "pdf", "doc", "default",""]
            },
            location: {
                type: String
            }
        },
        approval_status: {
            type: String,
            enum: ["pending", "approved"]
        },
        sender: {
            id: {
                type: mongoose.Schema.Types.ObjectId
            },
            name: String
        },
        sentAt: String
    }]
})

const ConversationModel = mongoose.model('Conversation', conversationSchema)
export default ConversationModel