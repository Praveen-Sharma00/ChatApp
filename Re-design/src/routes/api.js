import express from 'express'

import {userController} from "../controllers/user";
import {checkSession} from '../middlewares/auth'

const api = express.Router()

api
    .route('/user/contacts')
    .get(userController.getUserContacts)
    .post(checkSession,userController.updateUserContact)


export let apiRoutes = api;


