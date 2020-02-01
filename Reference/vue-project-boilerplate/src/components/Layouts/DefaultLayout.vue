<template>
  <section>
    <app-drawer></app-drawer>
    <section>
      <div>
        <router-view></router-view>
      </div>
    </section>
  </section>
</template>

<script>
import AppDrawer from "../AppDrawer"

export default {
  components: {
    AppDrawer
  },
}
</script>
<style scoped>

</style>
