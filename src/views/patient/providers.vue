<template>
    <div class="col-md-12">
        <h2>Providers List</h2>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Doctor ID</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(provider, index) of providers">
                    <th scope="row">{{index + 1}}</th>
                    <td>{{provider.doctorID}}</td>
                    <td>
                        <button @click="revokeAccess(provider.doctorID)" class="btn btn-success">Revoke Access</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                providers: {}
            }
        },
        methods: {
            revokeAccess(doctorID){
                fetch('http://localhost:8000/revokeaccess',{
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        doctorID: doctorID
                    })
                })
                .then(res => {
                    res.json()
                    .then(res => {
                        Toast.fire({
                            type: 'error',
                            title: res.message
                        })
                        Fire.$emit('AfterCreate')
                    })
                })
            },
            getProviders(){
                fetch('http://localhost:8000/getproviders',{
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => {
                    res.json()
                    .then(res => {
                        if(res.status === '200'){
                            this.providers = res.providers
                        }
                    })
                })
                .catch(err => {
                    Toast.fire({
                        type: 'error',
                        title: 'There was an error in fetching list of provider\'s'
                    })
                })
            },
        },
        created(){
            this.getProviders()
            Fire.$on('AfterCreate', () => {
                this.getProviders();
            });
        }
    }
</script>