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
      result["adminLevel"] = members[i]["adminLevel"];
      membersArr.push(result);
    }

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
    const _result = await _Group.default.aggregate([{
      $unwind: "$members"
    }, {
      $match: {
        "members._id": currentUser._id
      }
    }]);

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
      "admins._id": currentUser._id
    });

    console.log(",,,," + _result[0].toObject().members[0]);

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
    }

    let membersArr = [];
    groupDetailObj.members.forEach(e => {
      membersArr.push({
        _id: _mongoose.default.Types.ObjectId(e),
        isAdmin: false,
        permissions: [],
        adminLevel: -1
      });
    });
    membersArr.push({
      _id: _mongoose.default.Types.ObjectId(currentUser._id),
      isAdmin: true,
      permissions: [],
      adminLevel: 1
    });
    const newGroup = new _Group.default({
      name: groupDetailObj.name,
      admins: [{
        _id: currentUser._id,
        level: 1
      }],
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

  async updateIndividualConversation(senderId, receiverID, text, message_type, media_type) {
    const user = await _User.default.findOne({
      _id: _mongoose.default.Types.ObjectId(senderId)
    });
    let a = senderId,
        b = receiverID;

    if (a > b) {
      [a, b] = [b, a];
    }

    let msg_type = "";
    let md_type = [];
    let md_loc = [];
    let text_ = "";

    if (message_type === "text") {
      msg_type = "text";
      text_ = text;
      md_type[0] = "default";
    } else {
      msg_type = "media";

      for (let i = 0; i < media_type.length; i++) {
        if (media_type[i] === "image") {
          md_type[i] = "image";
          text_ = "";
          md_loc[i] = text[i];
        } else if (media_type[i] === "pdf") {
          md_type[i] = "pdf";
          text_ = "";
          md_loc[i] = text[i];
        } else if (media_type[i] === "doc") {
          md_type[i] = "doc";
          text_ = "";
          md_loc[i] = text[i];
        }
      }
    }

    const conversation = await _Conversation.default.findOne({
      between_users: [_mongoose.default.Types.ObjectId(a), _mongoose.default.Types.ObjectId(b)]
    });

    if (!conversation) {
      const newConversation = new _Conversation.default({
        between_users: [_mongoose.default.Types.ObjectId(a), _mongoose.default.Types.ObjectId(b)],
        conversation_type: 1,
        messages: [{
          text: text_,
          message_type: msg_type,
          media: {
            object_type: md_type,
            object_location: md_loc
          },
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
        text: text_,
        message_type: msg_type,
        media: {
          object_type: md_type,
          object_location: md_loc
        },
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

  async updateGroupConversation(senderId, groupId, text, message_type, media_type) {
    const user = await _User.default.findOne({
      _id: _mongoose.default.Types.ObjectId(senderId)
    });
    let msg_type = "";
    let md_type = [];
    let md_loc = [];
    let msg_status = "";
    let text_ = "";

    if (message_type === "text") {
      msg_type = "text";
      md_type[0] = "default";
      text_ = text;
    } else {
      msg_type = "media";
      msg_status = "pending";

      for (let i = 0; i < media_type.length; i++) {
        if (media_type[i] === "image") {
          md_type[i] = "image";
          text_ = "";
          md_loc[i] = text[i];
        } else if (media_type[i] === "pdf") {
          md_type[i] = "pdf";
          text_ = "";
          md_loc[i] = text[i];
        } else if (media_type[i] === "doc") {
          md_type[i] = "doc";
          text_ = "";
          md_loc = text[i];
        }
      }
    }

    const conversation = await _Conversation.default.findOne({
      group_id: _mongoose.default.Types.ObjectId(groupId)
    });

    if (!conversation) {
      const newConversation = new _Conversation.default({
        between_users: [],
        group_id: _mongoose.default.Types.ObjectId(groupId),
        conversation_type: 2,
        messages: [{
          text: text_,
          message_type: msg_type,
          media: {
            object_type: md_type,
            object_location: md_loc,
            approval_status: msg_status
          },
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
        text: text_,
        sender: {
          id: _mongoose.default.Types.ObjectId(user._id),
          name: user.name
        },
        message_type: msg_type,
        media: {
          object_type: md_type,
          object_location: md_loc,
          approval_status: msg_status
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

  async getPendingGroupUploads(groupId) {
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

    const _r = [];

    for (let i = 0; i < _result.messages.length; i++) {
      _r.push(_result.messages[i].toObject());
    }

    console.log(_r); // console.log(_result.messages)

    process.exit();

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

  async updatePendingGroupUploadStatus(groupId, msgId) {} // async findGroup(groupId){
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
    }); // const isPresent = group.admins.includes(currentUserId)

    console.log(group.admins);
    const isPresent = group.admins.map(obj => obj._id == currentUserId).length > 0;

    if (!isPresent) {
      return {
        success: false,
        error: {
          message: "You\'re not authorized "
        }
      };
    }

    const newAdmins = group.admins; // const newPermissions = group.members.filter(m => m._id == userId)[0].permissions

    const newPermissions = group.members.filter(m => m._id == userId)[0].permissions; // const isUserAlreadyAdmin = newAdmins.map((obj=>obj._id==userId)).length > 0

    const isUserAlreadyAdmin = newAdmins.filter(obj => obj._id == userId).length > 0; // console.log("isUserAlreadyAdmin : ",isUserAlreadyAdmin)

    const _r = permissions;

    if (_r.includes("Admin")) {
      if (!isUserAlreadyAdmin) {
        console.log("THIS AGAIN RUNS");
        group.members.filter(m => m._id == userId)[0].isAdmin = true;
        group.members.filter(m => m._id == userId)[0].adminLevel = 2;
        newAdmins.push({
          _id: _mongoose.default.Types.ObjectId(userId),
          level: 2
        });
      }
    } else if (_r.includes("~Admin")) {
      const index = newAdmins.findIndex(obj => obj._id == userId);

      if (index > -1) {
        newAdmins.splice(index, 1);
      }

      group.members.filter(m => m._id == userId)[0].isAdmin = false;
      group.members.filter(m => m._id == userId)[0].adminLevel = -1;
    }

    if (_r.includes("ReadOnly")) {
      if (!newPermissions.includes("ReadOnly")) newPermissions.push("ReadOnly");
    } else if (_r.includes("~ReadOnly")) {
      console.log("THIS RUNS");
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

    group.admins = newAdmins;
    group.members.filter(m => m._id == userId)[0].permissions = newPermissions;
    await group.save();
    return {
      success: true,
      error: {},
      data: {}
    };
  }

  async getUserPermissions(userId, groupId) {
    // let _result = await GroupModel.aggregate([{$unwind: "$members"}, {$match: {
    //     $and:[{"_id":groupId},{"members._id": userId}]
    //     }}])
    let _result = await _Group.default.aggregate([{
      $unwind: "$members"
    }, {
      $match: {
        "_id": _mongoose.default.Types.ObjectId(groupId),
        "members._id": _mongoose.default.Types.ObjectId(userId)
      }
    }]);

    let permissions = {};
    permissions["isAdmin"] = _result[0].members.isAdmin;

    if (_result[0].members.permissions === undefined) {
      permissions["ReadOnly"] = false;
      permissions["BlockUploads"] = false;
    } else {
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