<template>
    <section>
        <img style="width: 25%;height: auto;" :src="QRCode" />
    </section>
</template>
<script>
export default {
    data(){
        return {
            QRCode : ""
        }
    },
    computed:{
        QRImage(){
            return this.$store.getters.GetQRCode 
        },
        LoginStatus(){
            return this.$store.getters.GetLoginStatus
        } 
    },
    watch: {
        QRImage(NewValue, OldValue) {
            if(NewValue){
                this.QRCode = NewValue
                this.$eventHub.$emit("LOADING",'false')
            }else{
                this.$eventHub.$emit('SNACK_BAR',{ "Show" : true ,"Text": "Cannot Generate QR Try Again Later","Color":"red","Close": false });
            }
        }
    },
    LoginStatus(NewValue,OldValue){
        
        if(NewValue){

          this.$http.defaults.headers.common['Authorization'] = localStorage.getItem('token')
          this.$router.go()
          this.$socket.REMOVE_QR_CLIENT()

        }else{
          this.$eventHub.$emit('SNACK_BAR',{ "Show" : true ,"Text": "Cannot Login","Color":"red","Close": false });
        }
    },
    methods:{
        
    },
    mounted(){
      
    }
}
</script>
<style scoped>

</style>