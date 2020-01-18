import AuthService from '../services/auth';

const _authService = new AuthService()

const postLogin = async (req, res) => {
    console.log(req.body)
    const response = await _authService.loginUser(req.body)
    console.log(response)
    return res.send(response)
}

const postRegister = async (req, res) => {
    const response = await _authService.registerUser(req.body)
    return res.send(response)
}

export let authController = {
    postLogin,
    postRegister
}