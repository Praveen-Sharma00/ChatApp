"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiRoutes = void 0;

var _express = _interopRequireDefault(require("express"));

var _user = require("../controllers/user");

var _auth = require("../middlewares/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const api = _express.default.Router();

api.route('/user').get(_auth.checkSession, _user.userController.getCurrentUser);
api.route('/user/contacts').get(_user.userController.getUserContacts).post(_auth.checkSession, _user.userController.updateUserContact);
api.route('/user/groups').get(_user.userController.getUserGroups).post(_auth.checkSession, _user.userController.createGroup);
api.route('/user/group/:groupId').get(_user.userController.getGroupMembers); // .post(checkSession, userController.createGroup)

api.route('/user/chats/:secondUserId').get(_user.userController.getConversationBetweenUsers).post(_user.userController.updateIndividualConversation); // .post(checkSession, userController.createGroup)

api.route('/user/chats/group/:groupId').get(_user.userController.getGroupConversations).post(_user.userController.updateGroupConversation);
api.route('/admin/groups').get(_user.userController.getAdminGroups); // .post(checkSession,userController.createGroup)

let apiRoutes = api;
exports.apiRoutes = apiRoutes;