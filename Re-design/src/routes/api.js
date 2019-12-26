import express from 'express'

import { userController } from "../controllers/user";
import { checkSession } from '../middlewares/auth'

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
    .route('/user/group/:groupId')
    .get(userController.getGroupMembers)
    .post(checkSession, userController.updatePermissions)

api
    .route('/user/group/:groupId/permissions')
    .get(userController.getUserPermissions)

api
    .route('/user/chats/:secondUserId')
    .get(userController.getConversationBetweenUsers)
    .post(userController.updateIndividualConversation)


// .post(checkSession, userController.createGroup)
api
    .route('/user/chats/group/:groupId')
    .get(userController.getGroupConversations)
    .post(userController.updateGroupConversation)


api
    .route('/admin/groups')
    .get(userController.getAdminGroups)
// .post(checkSession,userController.createGroup)


export let apiRoutes = api;


