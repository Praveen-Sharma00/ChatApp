"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AuthService {
  generateToken(user) {
    let token = _jsonwebtoken.default.sign({
      id: user._id
    }, 'cloud_', {
      expiresIn: 86400 // expires in 24 hours

    });

    return token;
  }

  async registerUser(user) {
    const {
      name,
      email,
      password
    } = user;

    const _result = await _User.default.findByCredentials(email);

    let _newUser;

    let id = _mongoose.default.Types.ObjectId();

    if (!_result) {
      _newUser = new _User.default({
        _id: id,
        name,
        email,
        password
      });
      await _newUser.save();
      let token = this.generateToken(_newUser);
      return {
        success: true,
        token: token,
        user: {
          name: user.name,
          email: user.email
        }
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

      let token = this.generateToken(user);
      return {
        success: true,
        token: token,
        user: {
          name: user.name,
          email: user.email
        }
      };
    }
  }

  async verifyToken(data) {
    let {
      token
    } = data;
    let response = '';
    let decoded;

    try {
      decoded = await _jsonwebtoken.default.verify(token, 'cloud_');

      const _userRecord = await _User.default.findOne({
        _id: _mongoose.default.Types.ObjectId(decoded.id)
      }).select('-password -_id -__v');

      response = {
        success: true,
        user: _userRecord
      };
    } catch (e) {
      response = {
        success: false,
        error: {
          message: 'Invalid token !'
        }
      };
    }

    return response;
  }

}

exports.default = AuthService;