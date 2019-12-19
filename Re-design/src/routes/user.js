import express from 'express'

import {userController} from "../controllers/user";
import {checkSession} from "../middlewares/auth";

const router = express.Router()

router
    .route('/dashboard')
    .get(checkSession,userController.dashboard)


export let userRoutes = router;