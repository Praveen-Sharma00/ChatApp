"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AuthService {
  async createUser(user) {
    console.log(user);
    const {
      name,
      email,
      password
    } = user;

    const _result = await _User.default.findByCredentials(email);

    let new_user;

    if (!_result) {
      new_user = new _User.default({
        name,
        email,
        password
      });
      await new_user.save();
      return {
        success: 201
      };
    } else {
      return {
        error: 400,
        message: 'A user with e-mail already exists !'
      };
    }
  }

}

exports.default = AuthService;