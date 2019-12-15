import mongoose from 'mongoose'
import User from "./User"


const groupSchema = new mongoose.Schema({
    name: {
        type: String
    },
    members:[{
        type :mongoose.Schema.Types.ObjectId,
        ref:'User'
    }]
})

const Group = mongoose.model('Group',groupSchema)
export default Group