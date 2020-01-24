import UserDetailService from "../services/user"

const _userDetailService = new UserDetailService()

const dashboard = async (req, res) => {
    res.render('dashboard')
}
const chat = async (req, res) => {
    res.render('chat/chat')
}
const configurePage = async (req, res) => {
    res.render('settings')
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
    const userId = req.params.id
    const response = await _userDetailService.getUserGroups(userId)
    return res.send(response)
}
const getAdminGroups = async (req, res) => {
    const {user} = req.session
    const response = await _userDetailService.getAdminGroups(user)
    return res.send(response)
}
const getGroupAdmins = async (req, res) => {
    const {groupId} = req.params
    const response = await _userDetailService.getGroupAdmins(groupId)
    return res.send(response)
}
const getGroupMembers = async (req, res) => {
    const groupId = req.params.groupId
    const response = await _userDetailService.getGroupMembers(groupId)
    return res.send(response)
}
const createGroup = async (req, res) => {
    const {user} = req.session
    const groupDetailObj = req.body
    const response = await _userDetailService.createGroup(user, groupDetailObj)
    return res.send(response)
}

const getConversationBetweenUsers = async (req, res) => {
    const currentUserId = req.params.firstUserId
    const secondUserId = req.params.secondUserId
    const response = await _userDetailService.getConversationBetweenUsers(currentUserId, secondUserId)
    return res.send(response)
}
const getGroupConversations = async (req, res) => {
    const groupId = req.params.id
    const response = await _userDetailService.getGroupConversations(groupId)
    return res.send(response)
}
const updateIndividualConversation = async (req, res) => {
    const {user} = req.session
    const receiverId = req.params.secondUserId
    const text = req.body.text.trim()
    const response = await _userDetailService.updateIndividualConversation(user._id, receiverId, text, '', '')
    return res.send(response)
}
const updateGroupConversation = async (req, res) => {
    const {text} = req.body
    const groupId = req.params.groupId
    const response = await _userDetailService.updateGroupConversation(user._id, groupId, text, '', '')
    return res.send(response)
}
const getPendingUploadRequests = async(req,res)=>{
    const groupId = req.params.groupId
    const response = await _userDetailService.getPendingUploadRequests(groupId)
    return res.send(response)
}
const updatePendingUploadStatus = async(req,res)=>{
    const groupId = req.params.groupId
    const status = req.body.request_status
    const response = await _userDetailService.updatePendingUploadStatus(groupId,status)
    return res.send(response)
}
const updatePendingGroupUploadStatus = async (req, res) => {
    const groupId = req.params.groupId
    const {msgId} = req.body
    const response = await _userDetailService.updatePendingGroupUploadStatus(groupId, msgId)
    return res.send(response)
}
const getPendingGroupUploads = async (req, res) => {
    const groupId = req.params.groupId
    const response = await _userDetailService.getPendingGroupUploads(groupId)
    return res.send(response)
}
const updatePermissions = async (req, res) => {
    const {user} = req.session
    const {groupId} = req.params
    const {permissions, userId} = req.body
    const response = await _userDetailService.updatePermissions(user._id, groupId, userId, permissions)
    return res.send(response)
}
const getUserPermissions = async (req, res) => {
    const userId = req.params.userId
    const groupId = req.params.groupId
    const response = await _userDetailService.getUserPermissions(userId, groupId)
    return res.send(response)
}
const updateMembersOfGroup = async (req, res) => {
    const {groupId} = req.params
    const {newMembers} = req.body
    const response = await _userDetailService.updateMembersOfGroup(groupId, newMembers)
    return res.send(response)
}
export let userController = {
    dashboard,
    chat,
    configurePage,

    getCurrentUser,
    getUserContacts,
    updateUserContact,

    getUserGroups,
    createGroup,
    getAdminGroups,
    updateMembersOfGroup,
    getGroupAdmins,
    getGroupMembers,
    updatePermissions,
    getUserPermissions,

    getConversationBetweenUsers,
    getGroupConversations,
    updateGroupConversation,
    getPendingGroupUploads,

    getPendingUploadRequests,
    updatePendingUploadStatus,

    updatePendingGroupUploadStatus,

    updateIndividualConversation
}