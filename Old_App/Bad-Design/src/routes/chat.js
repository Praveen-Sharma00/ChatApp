import express from 'express'
const router = express.Router()

import {dashboardController} from "../controllers/chat";
import {authController} from "../controllers/auth";

router
    .route('/group-chat')
    .get(authController.protectRoute,dashboardController.groupChat)

router
    .route('/chat')
    .get(authController.protectRoute,dashboardController.chat)

router
    .route('/dashboard')
    .get(authController.protectRoute,dashboardController.dashboard)

export let dashboardRoutes = router;