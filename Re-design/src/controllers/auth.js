const postLogin = async (req, res) => {
    res.send('Login')
}
const postSignup = async (req, res) => {
    res.send('Signup')
}
const destroySession = async (req, res) => {
    res.send('Destroy')
}
const protectRoute = async (req, res, next) => {
    if (req.session.isLoggedIn)
        return next()
    return res.redirect('/')
}

export let authController = {
    postLogin,
    postSignup,
    destroySession,
    protectRoute
}