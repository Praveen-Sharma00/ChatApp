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
// app.get('/sample',async(req,res)=>{
//     const c=new Conversation({
//   between_users:[mongoose.Types.ObjectId("5df85c4c21627c11e1cbbb1a"),mongoose.Types.ObjectId("5df85c7521627c11e1cbbb1c")],
//         conversation_type:1,
//         messages:[{
//            text:'Hello amit',
//             sender:{
//                id:mongoose.Types.ObjectId("5df85c4c21627c11e1cbbb1a"),
//                 name:"Praveen"
//             },
//             timestamp:13132434234
//         }]
//
//     })
//
//     await c.save()
// })
app.use(defaultRoutes)
app.use(authRoutes)
app.use(dashboardRoutes)
app.use(userRoutes)
/********************************************************************* */

export default app
