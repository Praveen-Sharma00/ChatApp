import express from 'express'

import {authController} from '../controllers/auth'


const router = express.Router()


router
    .route('/login')
    .post(authController.postLogin)
router
    .route('/register')
    .post(authController.postRegister)

router
    .route('/verify')
    .post(authController.verifyToken)

export let authRoutes = router;


