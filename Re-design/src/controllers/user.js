import UserDetailService from "../services/user";

const _userDetailService = new UserDetailService()

const dashboard = async (req, res) => {
    res.render('dashboard')
}

const getUserContacts = async (req, res) => {
    const {user} = req.session
    const response = await _userDetailService.getUserContacts(user)
    return res.send(response)
}

const updateUserContact = async (req, res) => {
    const {user} = req.session
    const details = req.body
    const response = await _userDetailService.updateUserContact(user, details)
    return res.send(response)
}

const getUserGroups = async (req, res) => {
    const {user} = req.session
    const response = await _userDetailService.getUserGroups(user)
    console.log(response)
    return res.send(response)
}
const getAdminGroups = async (req, res) => {
    const {user} = req.session
    const response = await _userDetailService.getAdminGroups(user)
    console.log(response)
    return res.send(response)
}
const createGroup = async (req, res) => {
    const {user} = req.session
    const groupDetailObj = req.body
    const response = await _userDetailService.createGroup(user, groupDetailObj)
    return res.send(response)
}

export let userController = {
    dashboard,
    getUserContacts,
    updateUserContact,
    getUserGroups,
    createGroup,
    getAdminGroups
}