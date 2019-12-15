import mongoose from 'mongoose'
import MessageType from "./MessageType";


const conversationSchema = new mongoose.Schema({
    between_users :[mongoose.Schema.Types.ObjectId],
    type : MessageType._id,
    messages:[{
        text:String,
        user_id:mongoose.Schema.Types.ObjectId,
        timestamp:Number
    }]
})

const Conversation = mongoose.model('Conversation',conversationSchema)
export default Conversation