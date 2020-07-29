<template>
    <div class="Layout">
        <Sidebar></Sidebar>
        <div class="container">
            <div class="row">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
    import Sidebar from '../../components/sidebar.vue';
    export default {
        components: {
            Sidebar: Sidebar
        }
    }
</script>