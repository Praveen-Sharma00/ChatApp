
const login = (req,res)=>{
    res.render('index')
}
const postLogin = async (req,res)=>{
    res.send('postlogin')
}
const signup = (req,res)=>{
    res.render('signup')
}
const postSignup = async (req,res)=>{
    res.send('postsignup')
}

export let authController={
    login,
    postLogin,
    signup,
    postSignup
}