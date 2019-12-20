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

const createGroup = async (req, res) => {
  const {
    user
  } = req.session;
  const groupDetailObj = req.body;
  const response = await _userDetailService.createGroup(user, groupDetailObj);
  return res.send(response);
};

let userController = {
  dashboard,
  chat,
  getCurrentUser,
  getUserContacts,
  updateUserContact,
  getUserGroups,
  createGroup,
  getAdminGroups
};
exports.userController = userController;