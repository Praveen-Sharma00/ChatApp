import express from 'express'
const router = express.Router()

import {defaultController} from "../controllers/default";

router
    .route('/')
    .get(defaultController.main)

export let defaultRoutes = router;