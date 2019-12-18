const postLogin = async (req, res) => {
    res.send('Login')
}
const postSignup = async (req, res) => {
    res.send('Signup')
}
const destroySession = async (req, res) => {
    res.send('Destroy')
}


export let authController = {
    postLogin,
    postSignup,
    destroySession
}