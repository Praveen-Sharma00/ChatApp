const User = require('./models/User')

const express= require('express')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
let app = express();
const cors = require('cors')

let http = require('http').Server(app);

mongoose.connect('mongodb+srv://dbCloud:9948686620Aa@cluster0-zz6zx.mongodb.net/Chat?retryWrites=true&w=majority',{
    useUnifiedTopology:true,
    useCreateIndex:true
},()=>{
    console.log('DB Connection established !')
})
let io = require('socket.io')(http);


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))




app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});
app.post('/register',async (req,res)=>{
    try{
        const newUser = new User({
            name:req.body._name,
            email:req.body._email,
            password:req.body._password,
            contacts:[]
        })
        await newUser.save()
        let token = jwt.sign({ id: newUser.id }, 'cloud_', {expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token, user: newUser });

    }catch(e){
        res.status(500).send("There was a problem registering the user.")
    }
})
app.post('/login',(req,res)=>{

})


io.on('connection', (socket) => {
    socket.on('new-message',(data)=>{
    socket.broadcast.emit('new-message',data)
    })
    socket.on('disconnect', () => {
        console.log("A user disconnected");
    });
});
http.listen(3000, () => {
    console.log('Listening on port *: 3000');
});