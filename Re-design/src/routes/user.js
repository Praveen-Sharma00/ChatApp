import express from 'express'

import {userController} from "../controllers/user";
import {checkSession} from "../middlewares/auth";

const router = express.Router()

router
    .route('/dashboard')
    .get(checkSession, userController.dashboard)
router
    .route('/chat')
    .get(checkSession, userController.personalChat)
router
    .route('/group_chat')
    .get(checkSession, userController.groupChat)


export let userRoutes = router;