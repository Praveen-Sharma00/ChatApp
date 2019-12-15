"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _MessageType = _interopRequireDefault(require("./MessageType"));

var _User = _interopRequireDefault(require("./User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const conversationSchema = new _mongoose.default.Schema({
  between_users: [_mongoose.default.Schema.Types.ObjectId],
  type: _MessageType.default._id,
  messages: [{
    text: String,
    user_id: {
      type: _mongoose.default.Schema.Types.ObjectId,
      ref: 'User'
    },
    timestamp: Number
  }]
});

const Conversation = _mongoose.default.model('Conversation', conversationSchema);

var _default = Conversation;
exports.default = _default;