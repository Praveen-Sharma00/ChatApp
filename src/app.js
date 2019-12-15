import express from 'express'
import path from 'path'


const app = express()

// Setting static folder
app.use(express.static(path.join(__dirname,'..','public')))

// Setting 'view' engine +  directory
app.engine('html',require('ejs').renderFile)
app.set('view engine','html')
app.set('views',path.join(__dirname,'..','public','views'))


export default  app
