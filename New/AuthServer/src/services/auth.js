import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

import UserModel from '../models/User'

export default class AuthService {

    generateToken(user) {
        let token = jwt.sign({id: user._id}, 'cloud_', {
            expiresIn: 86400 // expires in 24 hours
        });
        return token
    }

    async registerUser(user) {
        const {name, email, password} = user
        const _result = await UserModel.findByCredentials(email)
        let _newUser;
        let id = mongoose.Types.ObjectId()
        if (!_result) {
            _newUser = new UserModel({
                _id: id, name, email, password
            })
            await _newUser.save()
            let token = this.generateToken(_newUser)
            return ({success: true, token: token, user: {name: user.name, email: user.email}});
        } else {
            return ({success: false, error: {message: 'A user with e-mail already exists !'}})
        }
    }

    async loginUser(credentials) {
        const {email, password} = credentials
        const _userRecord = await UserModel.findByCredentials(email, password)
        if (!_userRecord) {
            return ({success: false, error: {message: 'Invalid Credentials!'}})
        } else {
            let user = _userRecord.toObject()
            let token = this.generateToken(user)
            return ({success: true, token: token, user: {name: user.name, email: user.email}});
        }
    }

    async verifyToken(data) {
        let {token} = data
        let response = ''
        let decoded ;
        try {
            decoded = await jwt.verify(token, 'cloud_')

            const _userRecord = await UserModel.findOne({
                _id: mongoose.Types.ObjectId(decoded.id)
            }).select('-password -_id -__v')

            response = {success: true, user: _userRecord}
        } catch (e) {
            response = {success: false, error: {message: 'Invalid token !'}}
        }
        return response
    }
}