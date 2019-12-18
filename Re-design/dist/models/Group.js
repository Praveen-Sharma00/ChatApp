"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const groupSchema = new _mongoose.default.Schema({
  name: {
    type: String
  },
  members: [{
    type: _mongoose.default.Schema.Types.ObjectId
  }],
  admins: [{
    type: _mongoose.default.Schema.Types.ObjectId
  }]
});

const GroupModel = _mongoose.default.model('Group', groupSchema);

var _default = GroupModel;
exports.default = _default;