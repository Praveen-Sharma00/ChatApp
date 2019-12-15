import express from 'express'

const router = express.Router()

import {userController} from "../controllers/user";

router
    .route('/user')
    .get(userController.getCurrentUser)



export let userRoutes = router;