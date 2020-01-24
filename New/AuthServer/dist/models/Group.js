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
    _id: {
      type: _mongoose.default.Schema.Types.ObjectId
    },
    isAdmin: {
      type: Boolean
    },
    permissions: [{
      type: String,
      enum: ['ReadOnly', 'BlockUploads']
    }],
    memberLevel: Number
  }],
  admins: [{
    _id: _mongoose.default.Schema.Types.ObjectId,
    level: Number
  }]
});

const GroupModel = _mongoose.default.model('Group', groupSchema);

var _default = GroupModel;
exports.default = _default;