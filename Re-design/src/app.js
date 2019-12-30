import express from 'express'
import cors from 'cors'
import compression from 'compression'
import path from 'path'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import './utils/globals'


import {authRoutes} from "./routes/auth";
import {defaultRoutes} from "./routes/default";
import {userRoutes} from "./routes/user";
import {apiRoutes} from "./routes/api";

import {Filter} from './utils/fileFilters'

dotenv.config({
    path: path.join(__dirname, '..', 'config.env')
})


const app = express()

const multer = require('multer')


let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '..', 'public','uploads'));
    },
    filename: function(req, file, cb) {
        cb(null, "file" + '-' +Date.now()+path.extname(file.originalname) );
    }
});

let uploadFile = multer({ storage: storage,fileFilter:Filter })
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
    // ,
    // cookie: { maxAge: 60000 }
}))


app.use(express.static(path.join(__dirname, '..', 'public')))
// app.use('/uploads', express.static(path.join(__dirname, '..', 'public','uploads')));
app.use('/assets',express.static(path.join(__dirname, '..', 'public','assets')))
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
app.use(userRoutes)
app.use('/api/v1',apiRoutes)

app.post('/upload',uploadFile.single('media'),(req,res)=>{
   if(req.fileValidationError){
       return res.send({success:false,error:{message:'Invalid file format'}})
   }
   res.send({success:true,filename:req.file.filename})
})
// app.use(userRoutes)
/********************************************************************* */

export default app
