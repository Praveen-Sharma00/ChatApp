"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userController = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _Group = _interopRequireDefault(require("../models/Group"));

var _Conversation = _interopRequireDefault(require("../models/Conversation"));

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const moment = require('moment');

const getCurrentUser = (req, res) => {
  res.send({
    id: req.session.user._id,
    name: req.session.user.name,
    email: req.session.user.email
  });
};

const addContact = async (req, res) => {
  const email = req.body.email.trim();
  const nick_name = req.body.name.trim();
  const user = await _User.default.findOne({
    email
  }); // console.log(user)

  const obj = await _User.default.findOne({
    _id: req.session.user._id
  }); // console.log(obj)

  const existingContacts = obj.Contacts;
  console.log(existingContacts);

  if (!user) {
    return res.send({
      error: 404,
      msg: 'No profile exists !'
    });
  } else if (existingContacts.length > 0) {
    const c = existingContacts.filter(e => e.email === email);
    console.log(c);

    if (c.length > 0) {
      return res.send({
        error: 404,
        msg: 'Contact already exists !'
      });
    }
  }

  await obj.Contacts.push({
    _id: user._id,
    nick_name: nick_name,
    email: email
  });
  await obj.save();
  res.send({
    success: 200,
    msg: 'Contact added!'
  });
};

const getContacts = async (req, res) => {
  const currentUser = req.session.user; // console.log(currentUser)

  const obj = await _User.default.findOne({
    _id: currentUser._id
  });
  const contacts = obj.Contacts; // console.log(contacts)

  if (contacts.length > 0) return res.send(contacts);
  res.send({
    error: 404,
    msg: 'No contacts found !'
  });
};

const addGroup = async (req, res) => {
  const admin = req.session.user._id;
  const group_name = req.body.name;
  const members = req.body.members;
  members.push(admin);
  const existingGroup = await _Group.default.findOne({
    name: group_name
  });

  if (existingGroup) {
    return res.send({
      msg: 'Group already exists',
      error: 404
    });
  }

  console.log(members);
  const newGroup = new _Group.default({
    name: group_name,
    admins: [admin],
    members: members
  });
  await newGroup.save();
  res.send({
    msg: 'Group created',
    success: 200
  });
};

const getChats = async (req, res) => {
  const senderID = req.session.user._id;
  const receiverID = req.body.id;
  const conversations = await _Conversation.default.getAllChatsBetweenUsers(senderID, receiverID);
  console.log(conversations);
  res.send({
    success: 200,
    data: conversations
  });
};

const getGroupChats = async (req, res) => {
  const messages = await _Conversation.default.getAllGroupChats("default");
  console.log(messages);
  res.send(messages);
};

const updateIndividualMessages = async function (senderName, senderID, receiverID, text, type) {
  let a, b;

  if (senderID < receiverID) {
    a = senderID;
    b = receiverID;
  } else {
    a = receiverID;
    b = senderID;
  }

  const conversation = await _Conversation.default.getAllChatsBetweenUsers(senderID, receiverID);

  if (conversation.length === 0) {
    const newConversation = new _Conversation.default({
      between_users: [_mongoose.default.Types.ObjectId(a), _mongoose.default.Types.ObjectId(b)],
      conversation_type: parseInt(type),
      messages: [{
        text: text,
        sender: {
          id: _mongoose.default.Types.ObjectId(senderID),
          name: senderName
        },
        timestamp: moment().format('MMMM Do YYYY, h:mm:ss a').toString()
      }]
    });
    await newConversation.save();
  } else {
    // const existingConversation = Conversation.findOne({
    //     between_users:[mongoose.Types.ObjectId(a.toString()),mongoose.Types.ObjectId(b.toString())]
    // })
    const existingConversation = await _Conversation.default.findOne({
      between_users: [a, b]
    });
    console.log(existingConversation.conversation_type);
    existingConversation.messages.push({
      text: text,
      sender: {
        id: _mongoose.default.Types.ObjectId(senderID),
        name: senderName
      },
      timestamp: moment().format('MMMM Do YYYY, h:mm:ss a').toString()
    });
    await existingConversation.save();
  }

  return true;
};

const updateGroupMessage = async (id, name, text) => {
  const existingConversation = await _Conversation.default.findOne({
    group_id: _mongoose.default.Types.ObjectId("5df9c531f699661b00c97df6")
  });
  console.log(existingConversation);
  existingConversation.messages.push({
    text: text,
    sender: {
      id: _mongoose.default.Types.ObjectId(id),
      name: name
    },
    timestamp: moment().format('MMMM Do YYYY, h:mm:ss a').toString()
  });
  await existingConversation.save();
  return true;
};

let userController = {
  getCurrentUser: getCurrentUser,
  addContact: addContact,
  getContacts: getContacts,
  addGroup: addGroup,
  getChats: getChats,
  getGroupChats: getGroupChats,
  updateIndividualMessages: updateIndividualMessages,
  updateGroupMessage: updateGroupMessage
};
exports.userController = userController;