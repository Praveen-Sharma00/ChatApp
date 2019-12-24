import mongoose from 'mongoose'


const groupSchema = new mongoose.Schema({
    name: {
        type: String
    },
    members: [{
        _id: { type: mongoose.Schema.Types.ObjectId },
        isAdmin: { type: Boolean },
        permissions: [{ type: String, enum: ['ReadOnly', 'NoImageUpload'] }]
    }],
    admins: [{
        type: mongoose.Schema.Types.ObjectId
    }]
})

const GroupModel = mongoose.model('Group', groupSchema)

export default GroupModel