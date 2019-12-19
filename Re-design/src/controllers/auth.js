import AuthService from '../services/auth';

const _authService = new AuthService()

const postLogin = async (req, res) => {
    const response = await _authService.loginUser(req.body)
    if(!response.success){
        return res.send(response.error.message)
    }else{
        req.session.isLoggedIn = true
        req.session.user = response.data.user
        console.log(req.session.user)
        return res.redirect('/dashboard')
    }
}

const postSignup = async (req, res)=>{
    const response = await _authService.registerUser(req.body)
    if (!response.success) {
        return res.send(response.error.message)
    } else {
        return res.redirect('/')
    }
}

const destroySession = async (req, res) => {
    req.session.destroy((err)=>{
        console.log(err)
    })
    return res.redirect('/')
}

export let authController = {
    postLogin,
    postSignup,
    destroySession
}