"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _User = _interopRequireDefault(require("./User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const conversationSchema = new _mongoose.default.Schema({
  between_users: [_mongoose.default.Schema.Types.ObjectId],
  conversation_type: {
    type: Number
  },
  messages: [{
    text: String,
    sender: {
      id: {
        type: _mongoose.default.Schema.Types.ObjectId,
        ref: 'User'
      },
      name: String
    },
    timestamp: String
  }]
});

conversationSchema.statics.getAllChatsBetweenUsers = async (sender, receiver) => {
  let a, b;

  if (sender < receiver) {
    a = sender;
    b = receiver;
  } else {
    b = sender;
    a = receiver;
  }

  const conversations = await Conversation.find({
    between_users: [a, b]
  });
  return conversations;
};

const Conversation = _mongoose.default.model('Conversation', conversationSchema);

var _default = Conversation;
exports.default = _default;