import User from "../models/User"
import Group from "../models/Group"

const getCurrentUser = (req, res) => {
    res.send({
        id: req.session.user._id,
        name: req.session.user.name,
        email: req.session.user.email
    })
}
const addContact = async (req, res) => {
    const email = req.body.email.trim()
    const nick_name = req.body.name.trim()

    const user = await User.findOne({
        email
    })

    const obj = await User.findOne({ _id: req.session.user._id })
    const existingContacts = obj.Contacts

    if (!user) {
        return res.send({
            error: 404,
            msg: 'No profile exists !'
        })
    } else if (existingContacts.length > 0) {
        const c = existingContacts.map((e) => (e.email === email))
        if (c.length > 0) {
            return res.send({
                error: 404,
                msg: 'Contact already exists !'
            })
        }
    }
    await obj.Contacts.push({
        _id: user._id,
        nick_name: nick_name,
        email: email
    })
    await obj.save()
    res.send({
        success: 200,
        msg: 'Contact added!'
    })
}
const getContacts = async (req, res) => {
    const currentUser = req.session.user
    // console.log(currentUser)
    const obj = await User.findOne({ _id: currentUser._id })
    const contacts = obj.Contacts
    // console.log(contacts)
    if (contacts.length > 0)
        return res.send(contacts)
    res.send({
        error: 404,
        msg: 'No contacts found !'
    })
}
const addGroup = async(req,res)=>{
    const admin = req.session.user._id
    const group_name = req.body.name
    const members = req.body.members
    console.log(members)
    const newGroup = new Group({
        name:group_name,
        admins:[admin],
        members:members
    })
    await newGroup.save()

    res.send({
        msg:'Group created',
        success:200
    })
}
export let userController = {
    getCurrentUser: getCurrentUser,
    addContact: addContact,
    getContacts: getContacts,
    addGroup:addGroup
}

