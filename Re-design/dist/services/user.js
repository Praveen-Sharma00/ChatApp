"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _Group = _interopRequireDefault(require("../models/Group"));

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

    const _result = _all.data.contacts.find(e => e.email == email);

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

    if (email === currentUser.email) {
      return {
        success: false,
        error: {
          message: 'You can\'t add yourself !'
        }
      };
    } else {
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

  async getUserGroups(currentUser) {
    const {
      _id: userID
    } = currentUser;

    const _result = await _Group.default.find({
      members: currentUser._id
    });

    if (!_result) {
      return {
        success: false,
        error: {
          message: 'No Groups found !'
        }
      };
    } else {
      let obj = _result;
      return {
        success: true,
        error: {},
        data: {
          obj
        }
      };
    }
  }

  async getAdminGroups(currentUser) {
    const {
      _id: userID
    } = currentUser;

    const _result = await _Group.default.find({
      admins: currentUser._id
    });

    if (!_result) {
      return {
        success: false,
        error: {
          message: 'No Groups found !'
        }
      };
    } else {
      let obj = _result;
      return {
        success: true,
        error: {},
        data: {
          obj
        }
      };
    }
  }

  async createGroup(currentUser, groupDetailObj) {
    const temp = await this.getAdminGroups(currentUser);
    const groups = temp.data.obj;

    for (let i = 0; i < groups.length; i++) {
      if (groups[i].name === groupDetailObj.name) {
        return {
          success: false,
          error: {
            message: 'A group with same name already exists !'
          }
        };
      }
    }

    let membersArr = [];
    groupDetailObj.members.forEach(e => {
      membersArr.push(_mongoose.default.Types.ObjectId(e));
    });
    membersArr.push(_mongoose.default.Types.ObjectId(currentUser._id));
    const newGroup = new _Group.default({
      name: groupDetailObj.name,
      admins: [currentUser._id],
      members: membersArr
    });
    await newGroup.save();
    return {
      success: true,
      error: {},
      data: {}
    };
  }

}

exports.default = UserDetailService;