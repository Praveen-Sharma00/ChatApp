import UserModel from '../models/User'

export default class AuthService {

    async createUser(user) {
        const {name, email, password} = user
        const _result = await UserModel.findByCredentials(email)
        let _newUser;
        if (!_result) {
            _newUser = new UserModel({
                name, email, password
            })
            await _newUser.save()
            return ({success: true, error: {}})
        } else {
            return ({success: false, error: {message: 'A user with e-mail already exists !'}})
        }
    }

    async findUser(credentials) {
        const {email, password} = credentials
        const _userRecord = await UserModel.findByCredentials(email, password)
        if (!_userRecord) {
            return ({success: false, error: {message: 'Invalid Credentials!'}})
        } else {
            let user = _userRecord.toObject()
            return ({success: true, error: {}, data: {user}})
        }
    }
}