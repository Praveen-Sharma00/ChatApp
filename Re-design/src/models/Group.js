import mongoose from 'mongoose'


const groupSchema = new mongoose.Schema({
    name: {
        type: String
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId
    }],
    admins: [{
        type: mongoose.Schema.Types.ObjectId
    }]
})

const Group = mongoose.model('Group', groupSchema)

export default Group