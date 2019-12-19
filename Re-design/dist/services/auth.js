"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AuthService {
  async registerUser(user) {
    const {
      name,
      email,
      password
    } = user;

    const _result = await _User.default.findByCredentials(email);

    let _newUser;

    if (!_result) {
      _newUser = new _User.default({
        name,
        email,
        password
      });
      await _newUser.save();
      return {
        success: true,
        error: {}
      };
    } else {
      return {
        success: false,
        error: {
          message: 'A user with e-mail already exists !'
        }
      };
    }
  }

  async loginUser(credentials) {
    const {
      email,
      password
    } = credentials;

    const _userRecord = await _User.default.findByCredentials(email, password);

    if (!_userRecord) {
      return {
        success: false,
        error: {
          message: 'Invalid Credentials!'
        }
      };
    } else {
      let user = _userRecord.toObject();

      return {
        success: true,
        error: {},
        data: {
          user
        }
      };
    }
  }

}

exports.default = AuthService;