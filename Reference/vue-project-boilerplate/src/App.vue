<template>
    <div id="app">
        <router-view></router-view>
        <app-loading></app-loading>
        <app-snackbar></app-snackbar>
    </div>
</template>
<script>
  import appLoading  from './components/Loader'
  import appSnackbar from './components/Snackbar'
  export default {
      components:{
          appLoading,
          appSnackbar
      }
  }
</script>

<style>
/* width */
::-webkit-scrollbar {
  width: 5px;
}
/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
/* Handle */
::-webkit-scrollbar-thumb {
  border-radius: 25px;
  background: #888; 
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
</style>

