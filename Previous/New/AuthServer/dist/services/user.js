"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _Group = _interopRequireDefault(require("../models/Group"));

var _Conversation = _interopRequireDefault(require("../models/Conversation"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _UploadRequest = _interopRequireDefault(require("../models/UploadRequest"));

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
      }).select('-password -contacts');
      result = result.toObject();
      result["isAdmin"] = members[i]["isAdmin"];
      result["permissions"] = members[i]["permissions"];
      result["adminLevel"] = members[i]["adminLevel"];
      membersArr.push(result);
    }

    return {
      success: true,
      error: {},
      members: membersArr
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

  async getAdminGroups(currentUser) {
    const {
      _id: userID
    } = currentUser;

    const _result = await _Group.default.find({
      "admins._id": currentUser._id
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

  async getGroupAdmins(groupId) {
    if (groupId === null || groupId === "") {
      return {
        success: false,
        error: {
          message: 'Invalid route params !'
        }
      };
    }

    const {
      admins
    } = await _Group.default.findOne({
      _id: groupId
    }).select('admins');
    return {
      success: true,
      error: {},
      admins: admins
    };
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
    const members = response.members;

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
      members: members
    };
  }

  async updateMembersOfGroup(groupId, members) {
    const group = await _Group.default.findOne({
      _id: groupId
    });
    members.forEach(m => {
      group.members.push({
        permissions: [],
        _id: m,
        isAdmin: false,
        memberLevel: 3
      });
    });
    await group.save();
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
        messages: messages
      };
    }
  }

  async updateIndividualConversation(room, sender, receiver, text, message_type, media) {
    let msg_type = "",
        md_type = [],
        md_loc = [],
        text_ = "";

    if (message_type === "text") {
      msg_type = "text";
      text_ = text;
    } else {
      msg_type = "media";

      for (let i = 0; i < media.type.length; i++) {
        md_loc[i] = media.location[i];

        if (media.type[i] === "image") {
          md_type[i] = "image";
          text_ = ""; // md_loc[i] = text[i]
        } else if (media.type[i] === "pdf") {
          md_type[i] = "pdf";
          text_ = "";
        } else if (media.type[i] === "doc") {
          md_type[i] = "doc";
          text_ = "";
        }
      }
    }

    const conversation = await _Conversation.default.findOne({
      between_users: room.name.split(",")
    });

    if (!conversation) {
      const newConversation = new _Conversation.default({
        between_users: room.name.split(","),
        conversation_type: 1,
        messages: [{
          text: text_,
          message_type: msg_type,
          media: {
            type: md_type,
            location: md_loc
          },
          sender: {
            id: _mongoose.default.Types.ObjectId(sender.id),
            name: sender.name
          },
          sentAt: moment().format('DD/MM/YY, h:mm A').toString()
        }]
      });
      await newConversation.save();
    } else {
      const existingConversation = await _Conversation.default.findOne({
        between_users: room.name.split(",")
      });
      existingConversation.messages.push({
        text: text_,
        message_type: msg_type,
        media: {
          type: md_type,
          location: md_loc
        },
        sender: {
          id: _mongoose.default.Types.ObjectId(sender.id),
          name: sender.name
        },
        sentAt: moment().format('DD/MM/YY, h:mm A').toString()
      });
      await existingConversation.save();
    }

    return {
      success: true,
      error: {},
      data: {}
    };
  }

  async updateGroupConversation(room, sender, receiver, text, message_type, media) {
    let msg_type = "",
        md_type = [],
        md_loc = [],
        text_ = "",
        msg_status = "pending";

    if (message_type === "text") {
      msg_type = "text";
      text_ = text;
    } else {
      msg_type = "media";
      msg_status = "approved";

      for (let i = 0; i < media.type.length; i++) {
        md_loc[i] = media.location[i];

        if (media.type[i] === "image") {
          md_type[i] = "image";
          text_ = "";
        } else if (media.type[i] === "pdf") {
          md_type[i] = "pdf";
          text_ = "";
        } else if (media.type[i] === "doc") {
          md_type[i] = "doc";
          text_ = "";
        }
      }
    }

    const conversation = await _Conversation.default.findOne({
      group_id: _mongoose.default.Types.ObjectId(receiver.id)
    });

    if (!conversation) {
      const newConversation = new _Conversation.default({
        between_users: [],
        group_id: _mongoose.default.Types.ObjectId(receiver.id),
        conversation_type: 2,
        messages: [{
          text: text_,
          message_type: msg_type,
          media: {
            type: md_type,
            location: md_loc
          },
          approval_status: msg_status,
          sender: {
            id: _mongoose.default.Types.ObjectId(sender.id),
            name: sender.name
          },
          sentAt: moment().format('DD/MM/YY, h:mm A').toString()
        }]
      });
      await newConversation.save();
    } else {
      const existingConversation = await _Conversation.default.findOne({
        group_id: _mongoose.default.Types.ObjectId(receiver.id)
      });
      existingConversation.messages.push({
        text: text_,
        sender: {
          id: _mongoose.default.Types.ObjectId(sender.id),
          name: sender.name
        },
        message_type: msg_type,
        media: {
          type: md_type,
          location: md_loc
        },
        approval_status: msg_status,
        sentAt: moment().format('DD/MM/YY, h:mm A').toString()
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
        messages: messages
      };
    }
  }

  async getPendingUploadRequests(groupId) {
    if (groupId === null || groupId === "") {
      return {
        success: false,
        error: {
          message: 'Invalid req params !'
        }
      };
    }

    const _result = await _UploadRequest.default.findOne({
      group_id: _mongoose.default.Types.ObjectId(groupId)
    }).select('uploads');

    if (!_result || _result === null) {
      return {
        success: false,
        error: {
          message: 'No conversation(s) !'
        }
      };
    } else {
      const requests = _result.uploads;

      if (!requests || requests.length === 0) {
        return {
          success: false,
          error: {
            message: 'No new request(s) so far !'
          }
        };
      } else {
        return {
          success: true,
          error: {},
          requests: requests
        };
      }
    }
  }

  async updatePendingUploadStatus(groupId, request) {
    const msgId = request.split("-")[1];
    const status = request.split("-")[0];
    const requestObj = await _UploadRequest.default.findOne({
      group_id: _mongoose.default.Types.ObjectId(groupId)
    }).select('uploads');

    if (!requestObj.uploads || requestObj.uploads.length === 0) {
      return {
        success: false,
        error: {
          message: 'No requests !'
        }
      };
    }

    if (status === 'accept') {
      let uploadReq = requestObj.uploads.find(e => e._id == msgId);
      const groupConversation = await _Conversation.default.findOne({
        group_id: _mongoose.default.Types.ObjectId(groupId)
      }).select('messages');
      groupConversation.messages.push({
        _id: _mongoose.default.Types.ObjectId(),
        media: {
          type: uploadReq.media.type,
          location: uploadReq.media.location
        },
        message_type: "media",
        sender: {
          id: uploadReq.sender.id,
          name: uploadReq.sender.name
        },
        approval_status: "approved",
        text: "",
        sentAt: uploadReq.sentAt
      });
      await groupConversation.save();
      return {
        success: true,
        message: 'Request Approved !'
      };
    } else {
      requestObj.uploads = requestObj.uploads.filter(e => {
        return e._id != msgId;
      });
      await requestObj.save();
      return {
        success: true,
        message: 'Request rejected !'
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

    if (!_result || _result === null) {
      return {
        success: false,
        error: {
          message: 'No conversation(s) !'
        }
      };
    } else {
      const messages = _result.messages;
      const pending_messages = [];

      for (let i = 0; i < messages.length; i++) {
        if (messages[i].approval_status === "pending") pending_messages.push(messages[i].toObject());
      }

      if (!pending_messages || pending_messages.length === 0) {
        return {
          success: false,
          error: {
            message: 'No new request(s) so far !'
          }
        };
      } else {
        return {
          success: true,
          error: {},
          data: {
            pending_messages
          }
        };
      }
    }
  }

  async updatePendingGroupUploadStatus(groupId, msgId) {
    if (groupId === null || groupId === "" || msgId === null || msgId === "") {
      return {
        success: false,
        error: {
          message: 'Invalid parameters !'
        }
      };
    }

    let _result = await _Conversation.default.findOne({
      "messages._id": msgId
    });

    if (!_result || _result === null) {
      return {
        success: false,
        error: {
          message: 'No such message found !'
        }
      };
    } else {
      let messageIndex = _result.messages.findIndex(m => {
        return m._id == msgId;
      });

      if (messageIndex > -1) {
        _result.messages[messageIndex].approval_status = "approved";
      }

      await _result.save();
      return {
        success: true,
        error: {},
        data: {}
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
    const isPresent = group.admins.map(obj => obj._id == currentUserId).length > 0;

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
    const isUserAlreadyAdmin = newAdmins.filter(obj => obj._id == userId).length > 0;
    const _r = permissions;

    if (_r.includes("Admin")) {
      if (!isUserAlreadyAdmin) {
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
      group.members.filter(m => m._id == userId)[0].adminLevel = 3;
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
    permissions["memberLevel"] = _result[0].members.memberLevel;

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
      permissions: permissions
    };
  }

  async createUploadRequest(details) {
    const {
      groupId,
      media,
      sender
    } = details;
    const pendingRequest = await _UploadRequest.default.findOne({
      group_id: _mongoose.default.Types.ObjectId(groupId)
    });

    const generatedId = _mongoose.default.Types.ObjectId();

    if (!pendingRequest) {
      const newRequest = new _UploadRequest.default({
        group_id: groupId,
        uploads: [{
          _id: generatedId,
          media: {
            type: media.type,
            location: media.location
          },
          sender: {
            id: sender.id,
            name: sender.name
          },
          sentAt: moment().format('DD/MM/YY, h:mm A').toString()
        }]
      });
      await newRequest.save();
    } else {
      const existingRequest = await _UploadRequest.default.findOne({
        group_id: groupId
      });
      existingRequest.uploads.push({
        _id: generatedId,
        media: {
          type: media.type,
          location: media.location
        },
        sender: {
          id: sender.id,
          name: sender.name
        },
        sentAt: moment().format('DD/MM/YY, h:mm A').toString()
      });
      await existingRequest.save();
    }

    return generatedId;
  }

  async getUserGroups(userId) {
    const _result = await _Group.default.aggregate([{
      $match: {
        "members._id": _mongoose.default.Types.ObjectId(userId)
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
        groups: obj
      };
    }
  }

  async createGroup(userId, groupObj) {
    const data = await this.getUserGroups(userId);
    const {
      groups
    } = data;

    for (let i = 0; i < groups.length; i++) {
      if (groups[i].name === groupObj.group_name) {
        return {
          success: false,
          error: {
            message: 'A group with same name already exists !'
          }
        };
      }
    }

    let membersArr = [];
    groupObj.members.forEach(e => {
      membersArr.push({
        _id: _mongoose.default.Types.ObjectId(e._id),
        isAdmin: false,
        permissions: [],
        adminLevel: 3
      });
    });
    membersArr.push({
      _id: _mongoose.default.Types.ObjectId(userId),
      isAdmin: true,
      permissions: [],
      adminLevel: 1
    });
    const newGroup = new _Group.default({
      _id: _mongoose.default.Types.ObjectId(),
      name: groupObj.group_name,
      admins: [{
        _id: userId,
        level: 1
      }],
      members: membersArr,
      imageUrl: "http://localhost:3000/uploads/" + groupObj.imageUrl
    });
    await newGroup.save();
    return {
      success: true,
      error: {},
      newGroup: newGroup
    };
  }

}

exports.default = UserDetailService;