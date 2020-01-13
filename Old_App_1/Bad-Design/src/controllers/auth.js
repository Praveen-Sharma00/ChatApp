import User from '../models/User'
import Group from "../models/Group";

const mongoose =require('mongoose')
const postLogin = async (req,res)=>{
    const email = req.body.lemail.trim()
    const password = req.body.lpassword.trim()
    const user = await User.findByCredentials(email,password)
    if(!user){
        return res.status(404).send({
            error:'No user found'
        })
    }
    req.session.user=user
    req.session.isLoggedIn = true
    req.session.save((err)=>{
        if(err){
            console.log('Error storing session')
            process.exit()
        }
    })
    res.redirect('/dashboard')
}

const postSignup = async (req,res)=>{
    var id = mongoose.Types.ObjectId()
    const userObj={
        _id:id,
         name:req.body.sfname + " " +req.body.slname,
         email:req.body.semail,
         password:req.body.spassword
    }
    const newUser = new User(userObj);
    await newUser.save()
    let r=await Group.findOne({name:'default'})
            r.members.push(id)
      await  r.save()


    res.redirect('/')
}
const destroySession = async (req,res)=>{
    req.session.destroy((err)=>{
        console.log(err)
    })
    return res.redirect('/')
}
const protectRoute = async (req,res,next)=>{
    if(req.session.isLoggedIn)
        return next()
    return res.redirect('/')
}
export let authController={
    postLogin,
    postSignup,
    destroySession,
    protectRoute
}