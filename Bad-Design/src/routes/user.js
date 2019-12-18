import express from 'express'

const router = express.Router()

import {userController} from "../controllers/user";

router
    .route('/user')
    .get(userController.getCurrentUser)

router
    .route('/contact')
    .post(userController.addContact)

router
    .route('/contacts')
    .get(userController.getContacts)

router
    .route('/group')
    .post(userController.addGroup)

router
    .route('/chats')
    .post(userController.getChats)

router
    .route('/group_chats')
    .get(userController.getGroupChats)

export let userRoutes = router;