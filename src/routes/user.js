import express from 'express'

const router = express.Router()

import { userController } from "../controllers/user";

router
    .route('/user')
    .get(userController.getCurrentUser)

router
    .route('/contact')
    .post(userController.addContact)



export let userRoutes = router;