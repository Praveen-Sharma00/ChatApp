import express from 'express'
import cors from 'cors'
import compression from 'compression'
import dotenv from 'dotenv'
import path from 'path'


import './modules/globals';

dotenv.config({
    path: path.join(__dirname,'..','config.env')
})

const app = express()

app.use(cors())
app.use(compression())
app.use(express.static(path.join(__dirname,'..','public')))

// Setting 'view' engine +  directory
app.engine('html',require('ejs').renderFile)
app.set('view engine','html')
app.set('views',path.join(__dirname,'..','public','views'))


export default  app
