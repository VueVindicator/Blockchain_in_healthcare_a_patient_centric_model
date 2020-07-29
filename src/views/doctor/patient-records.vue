<template>
    <div class="col-md-12">
        <div v-if="authorized">
            <h2>Records of {{patientID}}</h2>
            <router-link to="newrecord" class="btn btn-primary">Upload new record</router-link>
            <br><br>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Date uploaded</th>
                        <th>View Record</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(record, index) in patientRecords">
                        <th scope="row">{{index + 1}}</th>
                        <td>{{record.recordID.recordTitle}}</td>
                        <td>{{record.recordID.time | myDate}}</td>
                        <td>
                            <router-link :to="'records/' + record.recordID._id" class="btn btn-success">View Record</router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="!authorized">
            <h2>{{message}}</h2>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                patientRecords: {},
                message: '',
                authorized: true,
                patientID: ''
            }
        },
        methods: {
            getPatientsRecords(){
                this.patientID = this.$route.params.id
                fetch('http://localhost:8000/getpatientrecords',{
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        patientID: this.patientID
                    })
                })
                .then(res => {
                    res.json()
                    .then(res => {
                        if(res.status === '200'){
                            console.log(res.patientRecords)
                            this.patientRecords = res.patientRecords
                        }
                        if(res.message){
                            this.authorized = false
                            this.message = res.message
                        }
                    })
                })
                .catch(err => {
                    Toast.fire({
                        type: 'error',
                        title: 'There was an error in fetching the patient\'s records'
                    })
                })
            }
        },
        created(){
            this.getPatientsRecords()
        }
    }
</script>