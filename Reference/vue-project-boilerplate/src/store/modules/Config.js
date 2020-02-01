const state = {

    Loading          : false,
    Access_Tabs      : [],
    ConnectionStatus : false,
    ConnectionErr    : false,
    ConnectionWaitingStatus : false,
    QR_Code          : "",
    Login_Status     : false
    
  }
  
  const mutations = {
      SetTabs(state,payload){
        state.Access_Tabs = payload
      },
      SetProgress(state,payload){
        state.Progress = payload
      },
      SetLoading(state,payload){
        state.Loading = payload
      },
      SetConnectionStatus(state,payload){
        state.ConnectionStatus = payload
      },
      SetWaitforConnection(state,payload){
        state.ConnectionWaitingStatus = payload
      },
      SetConnectionErrMsg(state,payload){
        state.ConnectionErr = payload
      },
      SetQRCode(state,payload){
        state.QR_Code = payload
      },
      SetLoginStatus(state,payload){
        state.Login_Status  = payload
      }
  }
  
  const actions = {
      
  }
  
  const getters = {

      GetProductionUrl(){
        
        if(process.env.NODE_ENV == 'development'){

            return 'http://localhost:8002' 

        }else{

            return 'https://api.ijiots.com'

        } 
      },
      GetAccessTabs(state){
        return state.Access_Tabs
      },
      GetLoading(state){
        return state.Loading 
      },
      GetConnectionStatus(state){
        return state.ConnectionStatus
      },
      GetWaitforConnection(state){
        return state.ConnectionWaitingStatus
      },
      GetConnectionErrMsg(state){
        return state.ConnectionErr
      },
      GetQRCode(state){
        return state.QR_Code
      },
      GetLoginStatus(state){
        return state.Login_Status
      }
  }
  
  export default {
    state,
    mutations,
    actions,
    getters
  }
  