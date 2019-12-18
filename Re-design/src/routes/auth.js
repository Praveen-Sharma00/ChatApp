import express from 'express'

import {authController} from '../controllers/auth'

const router = express.Router()


router
    .route('/login')
    .post(authController.postLogin)

router
    .route('/signup')
    .post(authController.postSignup)

export let authRoutes = router;


