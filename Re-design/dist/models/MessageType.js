"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const messageTypeSchema = new _mongoose.default.Schema({
  type_id: {
    type: Number
  },
  name: {
    type: String,
    unique: true
  }
});

const MessageTypeModel = _mongoose.default.model('MessageType', messageTypeSchema);

var _default = MessageTypeModel;
exports.default = _default;