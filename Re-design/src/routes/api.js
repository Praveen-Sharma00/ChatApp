import express from 'express'
import {userController} from "../controllers/user";


const router = express.Router()

router
    .route('/user',userController)
export let apiRoutes = router;


