import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isMessageAreaActive : false
  },
  getters:{
    GetMessageAreaState(state){
      return state.isMessageAreaActive
    }
  },
  mutations:{
    SetMessageAreaState(state,payload){
      state.isMessageAreaActive = payload
    }
  }
})
