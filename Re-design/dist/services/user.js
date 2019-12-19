"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserDetailService {
  async getUserContacts(currentUser) {
    const {
      _id: userID
    } = currentUser;

    const _result = await _User.default.findOne({
      _id: userID
    }).select('contacts');

    if (!_result) {
      return {
        success: false,
        error: {
          message: 'No contacts!'
        }
      };
    } else {
      let contacts = _result.contacts;
      return {
        success: true,
        error: {},
        data: {
          contacts
        }
      };
    }
  }

  async findContact(currentUser, email) {
    const _all = await this.getUserContacts(currentUser);

    const _result = _all.data.contacts.find(e => e.email == email); // console.log(_all.data.contacts.find(e=>e.email==="amit@gmail.com"))
    // console.log(_result)


    if (!_result) {
      return {
        success: false,
        error: {
          message: 'No such contact!'
        }
      };
    } else {
      let contact = _result;
      return {
        success: true,
        error: {},
        data: {
          contact
        }
      };
    }
  }

  async updateUserContact(currentUser, details) {
    const {
      name,
      email
    } = details;
    console.log(name, " ", email);
    const contactUser = await _User.default.findByCredentials(email);

    if (!contactUser) {
      return {
        success: false,
        error: {
          message: 'The contact you\'re trying to add doesn\'t use this app!'
        }
      };
    }

    const currentUserObj = await _User.default.findByCredentials(currentUser.email);
    const searchResult = await this.findContact(currentUser, email);

    if (!searchResult.success) {
      currentUserObj.contacts.push({
        _id: contactUser.id,
        name,
        email
      });
      await currentUserObj.save();
      return {
        success: true,
        error: {},
        data: {}
      };
    } else {
      return {
        success: false,
        error: {
          message: 'Contact Already exists !'
        }
      };
    }
  }

}

exports.default = UserDetailService;