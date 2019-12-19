import AuthService from '../services/auth';

const _authService = new AuthService()

const postLogin = async (req, res) => {
    const response = await _authService.findUser(req.body)
    if(!response.success){
        return res.send(response.error.message)
    }else{
        req.session.isLoggedIn = true
        req.session.user = response.data.user
        return res.redirect('/dashboard')
    }
}

const postSignup = async (req, res)=>{
    const response = await _authService.createUser(req.body)
    if (!response.success) {
        return res.send(response.error.message)
    } else {
        return res.redirect('/')
    }
}

const destroySession = async (req, res) => {
    res.send('Destroy')
}


export let authController = {
    postLogin,
    postSignup,
    destroySession
}