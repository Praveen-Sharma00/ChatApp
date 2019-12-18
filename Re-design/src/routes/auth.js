import express from 'express'

import {authController} from '../controllers/auth'
import {authenticate} from '../middlewares/auth'
const router = express.Router()


router
    .route('/login')
    .post(authController.postLogin)

router
    .route('/signup')
    .post(authController.postSignup)

router
    .route('/logout')
    .post(authenticate,authController.destroySession)

export let authRoutes = router;


