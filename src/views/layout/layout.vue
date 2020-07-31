<template>
    <div>
        <Sidebar></Sidebar>
        <div class="container">
            <div class="row">
                <router-view></router-view>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
    import Sidebar from '../../components/sidebar.vue';
    import Footer from '../../components/accountfooter.vue';
    export default {
        components: {
            Sidebar: Sidebar,
            Footer: Footer
        },
        created(){
            //
        }
    }
</script>
<style scoped>
    .container {
        margin-bottom: 40px;
    }
</style>