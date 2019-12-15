

const postLogin = async (req,res)=>{
    res.send(req.body)
}

const postSignup = async (req,res)=>{
    res.send('postsignup')
}

export let authController={
    postLogin,
    postSignup
}