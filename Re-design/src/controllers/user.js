import UserDetailService from "../services/user";



const _userDetailService = new UserDetailService()

const dashboard = async (req, res) => {
    res.render('dashboard')
}
const chat = async (req, res) => {
    res.render('chat/chat')
}

const getCurrentUser = async (req, res) => {
    const {user} = req.session
    return res.send(user)
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
    return res.send(response)
}
const getAdminGroups = async (req, res) => {
    const {user} = req.session
    const response = await _userDetailService.getAdminGroups(user)
    return res.send(response)
}
const getGroupMembers = async(req,res)=>{
    const groupId=req.params.groupId
    const response = await _userDetailService.getGroupUserDetails(groupId)
    return res.send(response)
}
const createGroup = async (req, res) => {
    const {user} = req.session
    const groupDetailObj = req.body
    const response = await _userDetailService.createGroup(user, groupDetailObj)
    return res.send(response)
}

const getConversationBetweenUsers = async (req, res) => {
    const {user} = req.session
    const currentUserId = user._id
    const secondUserId = req.params.secondUserId

    const response = await _userDetailService.getConversationBetweenUsers(currentUserId,secondUserId)
    console.log(response)
    return res.send(response)
}
const getGroupConversations = async(req,res)=>{
    const id = req.params.groupId
    const response = await _userDetailService.getGroupConversations(id)
    return res.send(response)
}
const updateIndividualConversation = async (req,res)=>{
    const {user} = req.session
    
    const receiverId = req.params.secondUserId

    const text = req.body.text.trim()
    const response = await _userDetailService.updateIndividualConversation(user._id,receiverId,text)
    return res.send(response)
}
const updateGroupConversation = async (req,res)=>{
    const {user}= req.session
    const {text} = req.body
    const groupId = req.params.groupId
    
    const response = await _userDetailService.updateGroupConversation(user._id,groupId,text)
    return res.send(response)
}
export let userController = {
    dashboard,
    chat,

    getCurrentUser,

    getUserContacts,
    updateUserContact,

    getUserGroups,
    createGroup,
    getAdminGroups,
    getGroupMembers,

    getConversationBetweenUsers,
    getGroupConversations,
    updateGroupConversation,
    updateIndividualConversation
}