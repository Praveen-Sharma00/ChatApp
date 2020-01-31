import AuthService from '../services/auth';

const _authService = new AuthService()

const postLogin = async (req, res) => {
    const response = await _authService.loginUser(req.body)
    return res.send(response)
}

const postRegister = async (req, res) => {
    const response = await _authService.registerUser(req.body)
    return res.send(response)
}
const verifyToken = async(req,res)=>{
    const response = await _authService.verifyToken(req.body)
    return res.send(response)
}

export let authController = {
    postLogin,
    postRegister,
    verifyToken
}