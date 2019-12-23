"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _Group = _interopRequireDefault(require("../models/Group"));

var _Conversation = _interopRequireDefault(require("../models/Conversation"));

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const moment = require('moment');

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

  async getGroupUserDetails(groupId) {
    const obj = await _Group.default.findOne({
      _id: groupId
    });
    console.log(obj);
    const membersArr = [];
    const {
      members
    } = obj;

    if (members.length === 0) {
      return {
        success: false,
        error: {
          message: 'No Group members !'
        }
      };
    } // members.forEach(async(e) => {
    //     let _result = await UserModel.findOne({
    //         _id: mongoose.Types.ObjectId(e)
    //     })
    //     console.log(_result)
    //     membersArr.push(_result)
    // })


    for (let i = 0; i < members.length; i++) {
      //    UserModel.findOne({
      //       _id:mongoose.Types.ObjectId(members[i])
      //   }).select('_id name email').then((result)=>{
      //       membersArr.push(result)
      //   })
      const result = await _User.default.findOne({
        _id: members[i]
      }).select('-password');
      membersArr.push(result);
    } // console.log(membersArr)


    return {
      success: true,
      error: {},
      data: {
        membersArr
      }
    };
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

  async getGroupMembers(groupId) {
    if (groupId === null || groupId === "") {
      return {
        success: false,
        error: {
          message: 'Invalid route params !'
        }
      };
    }

    const response = await getGroupUserDetails(groupId);
    const members = response.data.membersArr;

    if (members.length === 0) {
      return {
        success: false,
        error: {
          message: response.error.message
        }
      };
    }

    return {
      success: true,
      error: {},
      data: {
        members
      }
    };
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

  async getConversationBetweenUsers(currentUserId, secondUserId) {
    if (secondUserId === null || secondUserId === "") {
      return {
        success: false,
        error: {
          message: 'Invalid req params !'
        }
      };
    }

    let a = currentUserId;
    let b = secondUserId;

    if (currentUserId > secondUserId) {
      [a, b] = [b, a];
    }

    const _result = await _Conversation.default.findOne({
      between_users: [_mongoose.default.Types.ObjectId(a), _mongoose.default.Types.ObjectId(b)],
      conversation_type: 1
    });

    console.log(_result);

    if (_result === null || _result.length === 0) {
      return {
        success: false,
        error: {
          message: 'No Conversations so far !'
        }
      };
    } else {
      let messages = _result.messages;
      return {
        success: true,
        error: {},
        data: {
          messages
        }
      };
    }
  }

  async updateIndividualConversation(senderId, receiverID, text) {
    const user = await _User.default.findOne({
      _id: _mongoose.default.Types.ObjectId(senderId)
    }); // console.log(result)

    let a = senderId,
        b = receiverID;

    if (a > b) {
      [a, b] = [b, a];
    }

    const conversation = await _Conversation.default.findOne({
      between_users: [_mongoose.default.Types.ObjectId(a), _mongoose.default.Types.ObjectId(b)]
    });

    if (!conversation) {
      const newConversation = new _Conversation.default({
        between_users: [_mongoose.default.Types.ObjectId(a), _mongoose.default.Types.ObjectId(b)],
        conversation_type: 1,
        messages: [{
          text: text,
          sender: {
            id: _mongoose.default.Types.ObjectId(user._id),
            name: user.name
          },
          timestamp: moment().format('MMMM Do YYYY, h:mm A').toString()
        }]
      });
      await newConversation.save();
    } else {
      const existingConversation = await _Conversation.default.findOne({
        between_users: [a, b]
      });
      existingConversation.messages.push({
        text: text,
        sender: {
          id: _mongoose.default.Types.ObjectId(user._id),
          name: user.name
        },
        timestamp: moment().format('MMMM Do YYYY, h:mm A').toString()
      });
      await existingConversation.save();
    }

    return {
      success: true,
      error: {},
      data: {}
    };
  }

  async updateGroupConversation(senderId, groupId, text) {
    const user = await _User.default.findOne({
      _id: _mongoose.default.Types.ObjectId(senderId)
    });
    const conversation = await _Conversation.default.findOne({
      group_id: _mongoose.default.Types.ObjectId(groupId)
    });

    if (!conversation) {
      const newConversation = new _Conversation.default({
        between_users: [],
        group_id: _mongoose.default.Types.ObjectId(groupId),
        conversation_type: 2,
        messages: [{
          text: text,
          sender: {
            id: _mongoose.default.Types.ObjectId(user._id),
            name: user.name
          },
          timestamp: moment().format('MMMM Do YYYY, h:mm A').toString()
        }]
      });
      await newConversation.save();
    } else {
      const existingConversation = await _Conversation.default.findOne({
        group_id: _mongoose.default.Types.ObjectId(groupId)
      });
      existingConversation.messages.push({
        text: text,
        sender: {
          id: _mongoose.default.Types.ObjectId(user._id),
          name: user.name
        },
        timestamp: moment().format('MMMM Do YYYY, h:mm A').toString()
      });
      await existingConversation.save();
    }

    return {
      success: true,
      error: {},
      data: {}
    };
  }

  async getGroupConversations(groupId) {
    if (groupId === null || groupId === "") {
      return {
        success: false,
        error: {
          message: 'Invalid req params !'
        }
      };
    }

    const _result = await _Conversation.default.findOne({
      group_id: _mongoose.default.Types.ObjectId(groupId),
      conversation_type: 2
    }).select('messages');

    if (!_result || _result.length === 0) {
      return {
        success: false,
        error: {
          message: 'No Conversations so far !'
        }
      };
    } else {
      let messages = _result.messages;
      return {
        success: true,
        error: {},
        data: {
          messages
        }
      };
    }
  }

}

exports.default = UserDetailService;