import store from '../store'

let _this = null

export default {
    socket: null,
    servertimer: null,
    init(socket){
        this.socket = socket
        this.events()
        _this = this
    },
    events(){

        this.socket.on('connect', function(){
            store.commit('SetConnectionStatus', true)
        });

        this.socket.on('reconnect_attempt', (attemptNumber) => {
            if(attemptNumber === 3) {
                store.commit('SetWaitforConnection', false)
            }
        });

        this.socket.on('connect_error', (error) => {
            store.commit('SetConnectionErrMsg', true)
        });

        this.socket.on('disconnect', function(){
            store.commit('SetConnectionStatus', false)            
        });

        this.socket.on('response', (data)=> {
            let response = data
            let method = response['channel']
            _this[method](response['status'])

        });
    },
    close(){
        if(this.socket !== null && this.socket !== undefined) {
            this.socket.close()
        }
    },
    GENERATE_QR(){
        this.socket.emit('GENERATE_QR')
    },
    'GENERATED_QR'(data){
        if(data && data['QR']){
            store.commit('SetQRCode', data.QR)
        }else{
            store.commit('SetQRCode', "")
        }
    },
    REMOVE_QR_CLIENT(){
        this.socket.emit('REMOVE_QR_CLIENT')
    },
    'SET_COOKIE'(data){
        var d = new Date()
        d.setTime(d.getTime() + (7*24*60*60*1000));
        document.cookie = `access_token=${data.Token};expires=${d.toUTCString()}`
        store.commit('SetLoginStatus',true)
    }
}
