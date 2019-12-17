"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userController = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _Group = _interopRequireDefault(require("../models/Group"));

var _Conversation = _interopRequireDefault(require("../models/Conversation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

let userController = {
  getCurrentUser: getCurrentUser,
  addContact: addContact,
  getContacts: getContacts,
  addGroup: addGroup,
  getChats: getChats
};
exports.userController = userController;