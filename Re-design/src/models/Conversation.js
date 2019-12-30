const mongoose = require('mongoose')


// const conversationSchema = new mongoose.Schema({
//     between_users: [mongoose.Schema.Types.ObjectId],
//     group_id: mongoose.Schema.Types.ObjectId,
//     conversation_type: {
//         type: Number
//     },
//     messages: [{
//         text: String,
//
//         sender: {
//             id: {
//                 type: mongoose.Schema.Types.ObjectId
//             },
//             name: String
//         },
//         sentAt: String
//     }]
// })
const conversationSchema = new mongoose.Schema({
    between_users: [mongoose.Schema.Types.ObjectId],
    group_id: mongoose.Schema.Types.ObjectId,
    conversation_type: {
        type: Number
    },
    messages: [{
        text: String,
        message_type:{
            type:String,
            enum:["text","media"]
        },
        media:{
            object_type:{
                type:String,
                enum:["image","pdf","doc","default"]
            },
            object_location:{
                type:String
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
// conversationSchema.statics.getAllChatsBetweenUsers = async (sender, receiver) => {
//     let a, b;
//     if (sender < receiver) {
//         a = sender;
//         b = receiver;
//     } else {
//         b = sender;
//         a = receiver;
//     }
//     const conversations = await Conversation.find({between_users: [a, b]})
//     return conversations
// }
//
// conversationSchema.statics.getAllGroupChats = async (name) => {
//     const conversations = await Conversation.findOne({group_id: mongoose.Types.ObjectId("5df9c531f699661b00c97df6")})
//     return conversations
// }
const ConversationModel = mongoose.model('Conversation', conversationSchema)
export default ConversationModel