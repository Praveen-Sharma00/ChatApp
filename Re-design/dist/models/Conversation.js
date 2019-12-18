"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const conversationSchema = new _mongoose.default.Schema({
  between_users: [_mongoose.default.Schema.Types.ObjectId],
  group_id: _mongoose.default.Schema.Types.ObjectId,
  conversation_type: {
    type: Number
  },
  messages: [{
    text: String,
    sender: {
      id: {
        type: _mongoose.default.Schema.Types.ObjectId
      },
      name: String
    },
    sentAt: String
  }]
}); // conversationSchema.statics.getAllChatsBetweenUsers = async (sender, receiver) => {
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

const Conversation = _mongoose.default.model('Conversation', conversationSchema);

var _default = Conversation;
exports.default = _default;