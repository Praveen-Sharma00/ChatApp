import UserModel from '../models/User'

export default class AuthService{

    async createUser(user){
        console.log(user)
        const {name,email,password} = user
        const _result = await UserModel.findByCredentials(email)
        let new_user;
        if(!_result){
            new_user  = new UserModel({
                name,email,password
            })
            await new_user.save()
            return ({success : 201})
        }else{
            return ({error : 400,message: 'A user with e-mail already exists !'})
        }
    }
}