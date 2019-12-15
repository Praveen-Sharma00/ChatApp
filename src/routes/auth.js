import express from 'express'

const router= express.Router()

import {authController} from "../controllers/auth";

router
        .route('/login')
        .get(authController.login)
        .post(authController.postLogin)

export let authRoutes = router;