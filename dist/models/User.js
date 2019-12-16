"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const bcrypt = require('bcryptjs');

const userSchema = new _mongoose.default.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  },
  Contacts: [{
    _id: _mongoose.default.Schema.Types.ObjectId,
    nick_name: String,
    email: String
  }]
});
userSchema.pre('save', async function () {
  const _user = this;

  if (_user.isModified('password')) {
    _user.password = await bcrypt.hash(_user.password, 12);
  }
});

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({
    email: email
  });

  if (!user) {
    return;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return;
  }

  return user;
};

const User = _mongoose.default.model('User', userSchema);

var _default = User;
exports.default = _default;