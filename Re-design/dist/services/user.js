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
    }

    for (let i = 0; i < members.length; i++) {
      let result = await _User.default.findOne({
        _id: members[i]._id
      }).select('-password -contacts'); // const newObj = {...result,isAdmin:members[i].isAdmin,permissions: members[i].permissions}

      result = result.toObject();
      result["isAdmin"] = members[i]["isAdmin"];
      result["permissions"] = members[i]["permissions"];
      membersArr.push(result);
    }

    console.log(membersArr);
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

    const _result = await _Group.default.aggregate([{
      $unwind: "$members"
    }, {
      $match: {
        "members._id": currentUser._id
      }
    }]);

    console.log(_result);

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

    const response = await this.getGroupUserDetails(groupId);
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
    } // console.log(groupDetailObj)


    let membersArr = [];
    groupDetailObj.members.forEach(e => {
      membersArr.push({
        _id: _mongoose.default.Types.ObjectId(e),
        isAdmin: false,
        permissions: []
      });
    });
    membersArr.push({
      _id: _mongoose.default.Types.ObjectId(currentUser._id),
      isAdmin: true,
      permissions: []
    });
    console.log(membersArr);
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
  } // async findGroup(groupId){
  //     const _result = await GroupModel.findOne({
  //         _id:mongoose.Types.ObjectId(groupId)
  //     })
  //     if(_result){
  //         return ({success:false,error:{message:'No group found'}})
  //     }
  //     const groupObj = _result
  //     return ({success:true,error:{},data:{groupObj}})
  // }


  async updatePermissions(currentUserId, groupId, userId, permissions) {
    const group = await _Group.default.findOne({
      _id: groupId
    });
    const isPresent = group.admins.includes(currentUserId);

    if (!isPresent) {
      return {
        success: false,
        error: {
          message: "You\'re not authorized "
        }
      };
    }

    const newAdmins = group.admins;
    const newPermissions = group.members.filter(m => m._id == userId)[0].permissions;
    const _r = permissions;

    if (_r.includes("Admin")) {
      if (!newAdmins.includes(userId)) {
        group.members.filter(m => m._id == userId)[0].isAdmin = true;
        newAdmins.push(userId);
      }
    } else if (_r.includes("~Admin")) {
      const index = newAdmins.indexOf(userId);

      if (index > -1) {
        newAdmins.splice(index, 1);
      }

      group.members.filter(m => m._id == userId)[0].isAdmin = false;
    }

    if (_r.includes("ReadOnly")) {
      if (!newPermissions.includes("ReadOnly")) newPermissions.push("ReadOnly");
    } else if (_r.includes("~ReadOnly")) {
      const index = newPermissions.indexOf("ReadOnly");

      if (index > -1) {
        newPermissions.splice(index, 1);
      }
    }

    if (_r.includes("BlockUploads")) {
      if (!newPermissions.includes("BlockUploads")) newPermissions.push("BlockUploads");
    } else if (_r.includes("~BlockUploads")) {
      const index = newPermissions.indexOf("BlockUploads");

      if (index > -1) {
        newPermissions.splice(index, 1);
      }
    }

    group.admins = newAdmins; // group.members.find((m)=>m._id === userId).permissions = newPermissions

    group.members.filter(m => m._id == userId)[0].permissions = newPermissions;
    await group.save();
    return {
      success: true,
      error: {},
      data: {}
    };
  }

  async getUserPermissions(userId, groupId) {
    let _result = await _Group.default.aggregate([{
      $unwind: "$members"
    }, {
      $match: {
        "members._id": userId
      }
    }]);

    let permissions = {};
    permissions["isAdmin"] = _result[0].members.isAdmin;

    if (_result[0].members.permissions === undefined) {
      console.log("HERE");
      permissions["ReadOnly"] = false;
      permissions["BlockUploads"] = false;
    } else {
      console.log(".....", _result[0].members.permissions.includes("ReadOnly"));
      permissions["ReadOnly"] = _result[0].members.permissions.includes("ReadOnly");
      permissions["BlockUploads"] = _result[0].members.permissions.includes("BlockUploads");
    }

    return {
      success: true,
      error: {},
      data: {
        permissions
      }
    };
  }

}

exports.default = UserDetailService;