import mongoose from 'mongoose'
import MessageType from "./MessageType";
import User from "./User"

const conversationSchema = new mongoose.Schema({
    between_users :[mongoose.Schema.Types.ObjectId],
    type : MessageType._id,
    messages:[{
        text:String,
        user_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        timestamp:Number
    }]
})

const Conversation = mongoose.model('Conversation',conversationSchema)
export default Conversation