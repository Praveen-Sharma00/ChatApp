import mongoose from 'mongoose'
import User from "./User"


const messageTypeSchema = new mongoose.Schema({
    name: {
        type: String
    }
})

const MessageType = mongoose.model('MessageType',messageTypeSchema)
export default MessageType