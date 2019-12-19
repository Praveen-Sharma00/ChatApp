import UserDetailService from "../services/user";

const _userDetailService = new UserDetailService()

const dashboard = async(req,res)=>{
    res.render('dashboard')
}

const getUserContacts = async(req,res)=>{
    const {user} = req.session
    const response  = await _userDetailService.getUserContacts(user)
    return res.send(response)
}

const updateUserContact = async (req,res)=>{
    const {user} = req.session
    const details = req.body
    const response = await _userDetailService.updateUserContact(user,details)
    return res.send(response)
}
export let userController = {
    dashboard,
    getUserContacts,
    updateUserContact
}