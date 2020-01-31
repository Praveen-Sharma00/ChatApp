import axios from 'axios';

export default{
    state:{
        currentRecipient: {},
    },
    getters:{
        GetCurrentRecipient(state) {
            return state.currentRecipient
        }
    },
    mutations:{
        SetRecipientDetails(state, payload) {
            state.currentRecipient = {
                _id: payload._id,
                name: payload.name,
                imageUrl: payload.imageUrl
            }
        }
    },
    actions:{

    }
}