import mongoose from 'mongoose'
import User from "./User"


const messageTypeSchema = new mongoose.Schema({
    type_id:{
        type: Number
    },
    name: {
        type: String,
        unique:true
    }
})

const MessageType = mongoose.model('MessageType',messageTypeSchema)
export default MessageType