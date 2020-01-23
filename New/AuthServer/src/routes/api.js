import express from 'express'

import {userController} from "../controllers/user";
import {checkSession} from '../middlewares/auth'

const api = express.Router()

api
    .route('/user')
    .get(checkSession, userController.getCurrentUser)

api
    .route('/user/contacts')
    .get(userController.getUserContacts)
    .post(checkSession, userController.updateUserContact)

api
    .route('/user/groups')
    .get(userController.getUserGroups)
    .post(checkSession, userController.createGroup)

api
    .route('/user/:id/groups')
    .get(userController.getUserGroups)

api
    .route('/chats/group/:id')
    .get(userController.getGroupConversations)

api
    .route('/user/:userId/group/:groupId/permissions')
    .get(userController.getUserPermissions)

api
    .route('/user/group/:groupId')
    .get(userController.getGroupMembers)
    .post(checkSession, userController.updatePermissions)



api
    .route('/user/chats/:firstUserId/:secondUserId')
    .get(userController.getConversationBetweenUsers)
    .post(userController.updateIndividualConversation)

api
    .route('/user/chats/group/:groupId')
    .get(userController.getGroupConversations)
    .post(userController.updateGroupConversation)

api
    .route('/group/:groupId/admins')
    .get(userController.getGroupAdmins)

api
    .route('/admin/groups')
    .get(userController.getAdminGroups)

api
    .route('/admin/group/:groupId/notifications')
    .get(userController.getPendingGroupUploads)
    .post(userController.updatePendingGroupUploadStatus)

api
    .route('/admin/group/:groupId')
    .post(userController.updateMembersOfGroup)

export let apiRoutes = api;


