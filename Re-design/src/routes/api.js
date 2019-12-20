import express from 'express'

import {userController} from "../controllers/user";
import {checkSession} from '../middlewares/auth'

const api = express.Router()
api
    .route('/user')
    .get(checkSession,userController.getCurrentUser)

api
    .route('/user/contacts')
    .get(userController.getUserContacts)
    .post(checkSession, userController.updateUserContact)
api
    .route('/user/groups')
    .get(userController.getUserGroups)
    .post(checkSession, userController.createGroup)

api
    .route('/admin/groups')
    .get(userController.getAdminGroups)
// .post(checkSession,userController.createGroup)


export let apiRoutes = api;


