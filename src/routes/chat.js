import express from 'express'
const router = express.Router()

import {dashboardController} from "../controllers/chat";

router
    .route('/group-chat')
    .get(dashboardController.chat)

export let dashboardRoutes = router;