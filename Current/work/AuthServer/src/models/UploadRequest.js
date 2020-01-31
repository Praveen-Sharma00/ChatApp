const mongoose = require('mongoose')

const uploadRequestSchema = new mongoose.Schema({
    group_id: mongoose.Schema.Types.ObjectId,
    uploads: [{
        media: {
            type: {
                type: [String],
                enum: ["image", "pdf", "doc", "default", ""]
            },
            location: {
                type: [String]
            }
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

const UploadRequestModel = mongoose.model('UploadRequest', uploadRequestSchema)
export default UploadRequestModel