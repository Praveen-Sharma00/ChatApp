import express from 'express'

const router = express.Router()

import {authController} from "../controllers/auth";

router
    .route('/login')
    .post(authController.postLogin)

router
    .route('/signup')
    .post(authController.postSignup)

export let authRoutes = router;