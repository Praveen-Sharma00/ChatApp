import express from 'express'
import cors from 'cors'
import compression from 'compression'
import path from 'path'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import './modules/globals'

import {defaultRoutes} from './routes/default'
import {authRoutes} from './routes/auth'

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
app.use(defaultRoutes)
app.use(authRoutes)
/********************************************************************* */

export default app