"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _User = _interopRequireDefault(require("./User"));

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

const MessageType = _mongoose.default.model('MessageType', messageTypeSchema);

var _default = MessageType;
exports.default = _default;