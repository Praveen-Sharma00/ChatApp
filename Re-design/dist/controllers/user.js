"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userController = void 0;

var _user = _interopRequireDefault(require("../services/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const _userDetailService = new _user.default();

const dashboard = async (req, res) => {
  res.render('dashboard');
};

const chat = async (req, res) => {
  res.render('chat/chat');
};

const configurePage = async (req, res) => {
  res.render('settings');
};

const getCurrentUser = async (req, res) => {
  const {
    user
  } = req.session;
  return res.send(user);
};

const getUserContacts = async (req, res) => {
  const {
    user
  } = req.session;
  const response = await _userDetailService.getUserContacts(user);
  return res.send(response);
};

const updateUserContact = async (req, res) => {
  const {
    user
  } = req.session;
  const details = req.body;
  const response = await _userDetailService.updateUserContact(user, details);
  return res.send(response);
};

const getUserGroups = async (req, res) => {
  const {
    user
  } = req.session;
  const response = await _userDetailService.getUserGroups(user);
  return res.send(response);
};

const getAdminGroups = async (req, res) => {
  const {
    user
  } = req.session;
  const response = await _userDetailService.getAdminGroups(user);
  return res.send(response);
};

const getGroupMembers = async (req, res) => {
  // console.log(req.params)
  const groupId = req.params.groupId;
  const response = await _userDetailService.getGroupMembers(groupId);
  return res.send(response);
};

const createGroup = async (req, res) => {
  const {
    user
  } = req.session;
  const groupDetailObj = req.body;
  const response = await _userDetailService.createGroup(user, groupDetailObj);
  return res.send(response);
};

const getConversationBetweenUsers = async (req, res) => {
  const {
    user
  } = req.session;
  const currentUserId = user._id;
  const secondUserId = req.params.secondUserId;
  const response = await _userDetailService.getConversationBetweenUsers(currentUserId, secondUserId);
  console.log(response);
  return res.send(response);
};

const getGroupConversations = async (req, res) => {
  const id = req.params.groupId;
  const response = await _userDetailService.getGroupConversations(id);
  return res.send(response);
};

const updateIndividualConversation = async (req, res) => {
  const {
    user
  } = req.session;
  const receiverId = req.params.secondUserId;
  const text = req.body.text.trim();
  const response = await _userDetailService.updateIndividualConversation(user._id, receiverId, text);
  return res.send(response);
};

const updateGroupConversation = async (req, res) => {
  const {
    user
  } = req.session;
  const {
    text
  } = req.body;
  const groupId = req.params.groupId;
  const response = await _userDetailService.updateGroupConversation(user._id, groupId, text);
  return res.send(response);
};

const updatePermissions = async (req, res) => {
  const {
    user
  } = req.session;
  const {
    groupId
  } = req.params;
  const {
    permissions,
    userId
  } = req.body; // console.log(groupId,"----",permissions)
  // process.exit()

  const response = await _userDetailService.updatePermissions(user._id, groupId, userId, permissions);
  return res.send(response);
};

const getUserPermissions = async (req, res) => {
  const {
    user
  } = req.session;
  const {
    groupId
  } = req.params;
  const response = await _userDetailService.getUserPermissions(user._id, groupId);
  return res.send(response);
};

let userController = {
  dashboard,
  chat,
  configurePage,
  getCurrentUser,
  getUserContacts,
  updateUserContact,
  getUserGroups,
  createGroup,
  getAdminGroups,
  getGroupMembers,
  updatePermissions,
  getUserPermissions,
  getConversationBetweenUsers,
  getGroupConversations,
  updateGroupConversation,
  updateIndividualConversation
};
exports.userController = userController;