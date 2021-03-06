import express from 'express'
import cors from 'cors'
import compression from 'compression'
import path from 'path'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import './modules/globals'

import {defaultRoutes} from './routes/default'
import {authRoutes} from './routes/auth'
import {dashboardRoutes} from "./routes/chat";
import {userRoutes} from "./routes/user";
import Group from "./models/Group";
import Conversation from "./models/Conversation";


const moment = require('moment')
dotenv.config({
    path: path.join(__dirname, '..', 'config.env')
})

const app = express()

mongoose.connect(
    process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }, () => {
        console.log(success('Database connection established !'))
    })

const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)

const expressStore = new MongoDBStore({
    uri: process.env.DATABASE_URL,
    collection: 'sessions'
})

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())
app.use(compression())
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'CloudSurfer',
    store: expressStore
}))
app.use(express.static(path.join(__dirname, '..', 'public')))

// Setting 'view' engine +  directory
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.set('views', path.join(__dirname, '..', 'public', 'views'))


/************************ROUTE MIDDLEWARES***************************** */
app.use((req,res,next)=>{
    res.locals.isAuthenticated = req.session.isLoggedIn
    res.locals.user = req.session.user
    next()
})

app.use(defaultRoutes)
app.use(authRoutes)
app.use(dashboardRoutes)
app.use(userRoutes)
/********************************************************************* */

export default app
