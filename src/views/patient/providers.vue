<template>
    <div class="col-md-12">
        <h2>Patient List</h2>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Doctor ID</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(patient, index) of patients">
                    <th scope="row">{{index + 1}}</th>
                    <td>{{patient.patientID}}</td>
                    <td>
                        <button @click="revokeAccess" class="btn btn-success">Revoke Access</button>
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
            revokeAccess(){},
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
        }
    }
</script>