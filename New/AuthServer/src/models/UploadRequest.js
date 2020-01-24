const mongoose = require('mongoose')

const uploadRequestSchema = new mongoose.Schema({
    between_users: [],
    group_id: mongoose.Schema.Types.ObjectId,
    messages: [{
        text: String,
        message_type: {
            type: String,
            enum: ["media"]
        },
        media: {
            type: {
                type: [String],
                enum: ["image", "pdf", "doc", "default", ""]
            },
            location: {
                type: [String]
            }
        },
        approval_status: {
            type: String,
            enum: ["pending"]
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

const UploadRequestModel = mongoose.model('Conversation', uploadRequestSchema)
export default UploadRequestModel