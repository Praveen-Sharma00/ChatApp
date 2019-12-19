import UserModel from '../models/User'


export default class UserDetailService {
    async getUserContacts(currentUser) {
        const { _id: userID } = currentUser
        const _result = await UserModel.findOne({ _id: userID }).select('contacts')
        if (!_result) {
            return ({ success: false, error: { message: 'No contacts!' } })
        } else {
            let contacts = _result.contacts
            return ({ success: true, error: {}, data: { contacts } })
        }
    }

    async findContact(currentUser, email) {

        const _all = await this.getUserContacts(currentUser)
        const _result = _all.data.contacts.find(e => e.email == email)
        // console.log(_all.data.contacts.find(e=>e.email==="amit@gmail.com"))
        // console.log(_result)
        if (!_result) {
            return ({ success: false, error: { message: 'No such contact!' } })
        } else {
            let contact = _result
            return ({ success: true, error: {}, data: { contact } })
        }
    }

    async updateUserContact(currentUser, details) {
        const { name, email } = details
        if (email === currentUser.email) {
            return ({ success: false, error: { message: 'You can\'t add yourself !' } })
        }
        else {
            const contactUser = await UserModel.findByCredentials(email)
            if (!contactUser) {
                return ({ success: false, error: { message: 'The contact you\'re trying to add doesn\'t use this app!' } })
            }
            const currentUserObj = await UserModel.findByCredentials(currentUser.email)
            const searchResult = await this.findContact(currentUser, email)
            if (!searchResult.success) {
                currentUserObj.contacts.push({
                    _id: contactUser.id,
                    name,
                    email
                })
                await currentUserObj.save()
                return ({ success: true, error: {}, data: {} })
            } else {
                return ({ success: false, error: { message: 'Contact Already exists !' } })
            }
        }
    }
}