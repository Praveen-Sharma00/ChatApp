export default {
    state:{
        isMessageAreaActive : false,
        userId : null,
        currentRecipient:{}
    },
    getters:{
        GetMessageAreaState(state){
            return state.isMessageAreaActive
        }
    },
    mutations:{
        SetMessageAreaState(state,payload){
            state.isMessageAreaActive = payload
        },
        SetRecipientDetails(state,payload){
            state.currentRecipient={
                id:payload.id,
                name:payload.name,
                imageUrl:payload.imageUrl
            }
        }
    },
    actions:{

    }
}