const mongoose = require('mongoose')

const messageTypeSchema = new mongoose.Schema({
    type_id: {
        type: Number
    },
    name: {
        type: String,
        unique: true
    }
})

const MessageTypeModel = mongoose.model('MessageType', messageTypeSchema)
module.exports=MessageTypeModel