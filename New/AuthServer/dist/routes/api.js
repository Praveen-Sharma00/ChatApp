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

api.route('/user/:id/groups').get(_user.userController.getUserGroups);
api.route('/chats/group/:id').get(_user.userController.getGroupConversations);
api.route('/user/:userId/group/:groupId/permissions').get(_user.userController.getUserPermissions);
api.route('/group/:groupId/admins').get(_user.userController.getGroupAdmins);
api.route('/group/:groupId/pending_uploads').get(_user.userController.getPendingUploadRequests).put(_user.userController.updatePendingUploadStatus);
api.route('/user').get(_auth.checkSession, _user.userController.getCurrentUser);
api.route('/user/contacts').get(_user.userController.getUserContacts).post(_auth.checkSession, _user.userController.updateUserContact);
api.route('/user/groups').get(_user.userController.getUserGroups).post(_auth.checkSession, _user.userController.createGroup);
api.route('/user/group/:groupId').get(_user.userController.getGroupMembers).post(_auth.checkSession, _user.userController.updatePermissions);
api.route('/user/chats/:firstUserId/:secondUserId').get(_user.userController.getConversationBetweenUsers).post(_user.userController.updateIndividualConversation);
api.route('/user/chats/group/:groupId').get(_user.userController.getGroupConversations).post(_user.userController.updateGroupConversation);
api.route('/group/:groupId/admins').get(_user.userController.getGroupAdmins);
api.route('/admin/groups').get(_user.userController.getAdminGroups);
api.route('/admin/group/:groupId/notifications').get(_user.userController.getPendingGroupUploads).post(_user.userController.updatePendingGroupUploadStatus);
api.route('/admin/group/:groupId').post(_user.userController.updateMembersOfGroup);
let apiRoutes = api;
exports.apiRoutes = apiRoutes;