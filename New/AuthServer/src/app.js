import express from 'express'
import cors from 'cors'
import compression from 'compression'
import path from 'path'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import './utils/globals'


import {authRoutes} from "./routes/auth";
import {apiRoutes} from "./routes/api";

import {Filter} from './utils/fileFilters'

const multer = require('multer')

dotenv.config({
    path: path.join(__dirname, '..', 'config.env')
})


const app = express()


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'public', 'uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, "file" + '-' + Date.now() + path.extname(file.originalname));
    }
});

let uploadFile = multer({storage: storage, fileFilter: Filter})
mongoose.connect(
    process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }, () => {
        console.log(success('Database connection established !'))
    })


app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(compression())


/************************ROUTE MIDDLEWARES***************************** */

app.use(authRoutes)
app.use('/api/v1', apiRoutes)

/************************************** UPLOAD HANDLER ***************************************/
app.post('/upload', uploadFile.array('file', 10), (req, res) => {
    const files = req.files
    let media_type = []
    let filename = []
    for (let i = 0; i < files.length; i++) {
        let ext = (files[i].filename).split('.')[1]
        filename.push(req.files[i].filename)
        if (ext === "jpg" || ext === "JPG" || ext === "jpeg" || ext === "JPEG" || ext === "png" || ext === "PNG" || ext === "gif" || ext === "GIF") {
            media_type.push("image")
        } else if (ext === "pdf" || ext === "PDF") {
            media_type.push("pdf")
        } else {
            media_type.push("doc")
        }
    }
    res.send({success: true, filename: filename, media_type: media_type})
})


export default app
