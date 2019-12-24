import express from 'express'

import {userController} from "../controllers/user";
import {checkSession} from "../middlewares/auth";

const router = express.Router()

router
    .route('/dashboard')
    .get(checkSession, userController.dashboard)
router
    .route('/dashboard/settings')
    .get(checkSession, userController.configurePage)

router
    .route('/chat')
    .get(checkSession, userController.chat)


export let userRoutes = router;