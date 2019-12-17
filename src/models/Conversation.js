import mongoose from 'mongoose'

import User from "./User"

const conversationSchema = new mongoose.Schema({
    between_users :[mongoose.Schema.Types.ObjectId],
    conversation_type : {
        type:Number
    },
    messages:[{
        text:String,
        sender:{
            id:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User'
            },
            name:String
        },
        timestamp:String
    }]
})

conversationSchema.statics.getAllChatsBetweenUsers= async (sender,receiver)=>{
    let a,b;
    if(sender<receiver){
        a=sender;b=receiver;
    }else{
        b=sender;a=receiver;
    }
    const conversations = await Conversation.find({between_users: [a,b]})
    return conversations
}
const Conversation = mongoose.model('Conversation',conversationSchema)
export default Conversation