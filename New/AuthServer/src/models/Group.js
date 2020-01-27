import mongoose from 'mongoose'

const groupSchema = new mongoose.Schema({
    name: {
        type: String
    },
    imageUrl:String,
    members: [{
        _id: {type: mongoose.Schema.Types.ObjectId},
        isAdmin: {type: Boolean},
        permissions: [{type: String, enum: ['ReadOnly', 'BlockUploads']}],
        memberLevel: Number
    }],
    admins: [{
        _id: mongoose.Schema.Types.ObjectId,
        level: Number
    }]
})

const GroupModel = mongoose.model('Group', groupSchema)

export default GroupModel