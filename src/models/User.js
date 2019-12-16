import mongoose from 'mongoose'

const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    Contacts:[{
        _id:mongoose.Schema.Types.ObjectId,
        name:String
    }]
})

userSchema.pre('save', async function () {
    const _user = this
    if (_user.isModified('password')) {
        _user.password = await bcrypt.hash(_user.password, 12)
    }
})
userSchema.statics.findByCredentials = async (email, password)=>
{
    const user = await User.findOne({
        email: email
    })
    if (!user) {
        return
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return
    }
    return user
}
const User = mongoose.model('User', userSchema)

export default User