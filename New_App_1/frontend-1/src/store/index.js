import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isMessageAreaActive : false,
    userId : null,
    userContacts : [],
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
    SetUserContacts(state,payload){
      payload.forEach((e)=>{
        state.userContacts.push(e)
      })
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
     fetchUserContacts(context){
      context.commit('SetUserContacts',[{
        id:1,
        name:'Some name',
        imageUrl:'https://p7.hiclipart.com/preview/4/1012/949/github-bitbucket-fork-software-repository-icons-for-windows-github-logo.jpg'
      },{
        id:2,
        name:'Carl Rock',
        imageUrl:'https://p7.hiclipart.com/preview/4/1012/949/github-bitbucket-fork-software-repository-icons-for-windows-github-logo.jpg'
      }])
    }
  }
})
