<template>
    <section class="primary split-bg">
        <app-login></app-login>
    </section>
</template>

<script>
import appLogin from '../../views/Login'
export default {
  components:{
      appLogin
  },
  data: () => ({}),

  methods: {}
}
</script>
<style scoped lang="css">
.split-bg {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
}
</style>
