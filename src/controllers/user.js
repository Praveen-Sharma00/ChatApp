const getCurrentUser = (req,res)=>{
    res.send({
        id:req.session.user._id,
        name:req.session.user.name,
        email:req.session.user.email
    })
}

export let userController={
    getCurrentUser:getCurrentUser
}