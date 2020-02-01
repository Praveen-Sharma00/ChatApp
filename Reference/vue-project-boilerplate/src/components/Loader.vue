<template>
    <section>
        <div v-if="Loading">Loader</div>
    </section>
</template>
<script>
export default {
    data(){
        return {
            Loading : false,
        }
    },
    created() {
        this.$eventHub.$on('LOADING', this.SetLoading);
    },
    beforeDestroy() {
        this.$eventHub.$off('LOADING');
    },
    methods:{
        SetLoading(payload){
            this.Loading = payload == 'true' ? true : false;
        }
    }
}
</script>
<style scoped>

</style>