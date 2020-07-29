<template>
    <div>
        <Sidebar></Sidebar>
        <div class="container text-center">
            <div class="row">
                <div class="col-md-12">
                    <div class="btn-group">
                        <router-link to="/blockchain" class="btn btn-primary">Blockchain</router-link>
                        <router-link to="/block-explorer" class="btn btn-primary">Block Explorer</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Sidebar from '../components/sidebar.vue';
    export default {
        components: {
            Sidebar: Sidebar
        },
        data(){
            return {

            }
        },
        methods: {

        }
    }
</script>