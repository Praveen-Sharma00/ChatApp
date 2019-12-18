import AuthService from '../services/auth';

const postLogin = async (req, res) => {
    res.send('Login')
}

const postSignup = async (req, res)=>{
    const _authService = new AuthService()
    const response = await _authService.createUser(req.body)
    if (response.error) {
        return res.send(response.message)
    } else if (response.success) {
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