"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _User = _interopRequireDefault(require("./User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const groupSchema = new _mongoose.default.Schema({
  name: {
    type: String
  },
  members: [{
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'User'
  }],
  admins: [{
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

const Group = _mongoose.default.model('Group', groupSchema);

var _default = Group;
exports.default = _default;