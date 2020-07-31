<template>
    <div class="col-md-12">
        <div>
            <h2>Records of {{user.userID}}</h2>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Doctor</th>
                        <th>Date uploaded</th>
                        <th>View Record</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(record, index) in patientRecords">
                        <th scope="row">{{index + 1}}</th>
                        <td>{{record.recordID.recordTitle}}</td>
                        <td>{{record.senderID}}</td>
                        <td>{{record.recordID.time | myDate}}</td>
                        <td>
                            <router-link :to="'records/' + record.recordID._id" class="btn btn-success">View Record</router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                patientRecords: {},
            }
        },
        methods: {
            getPatientsRecords(){
                fetch('http://localhost:8000/patientrecords',{
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    },
                })
                .then(res => {
                    res.json()
                    .then(res => {
                        console.log(res.patientRecords)
                        this.patientRecords = res.patientRecords
                    })
                })
                .catch(err => {
                    Toast.fire({
                        type: 'error',
                        title: 'There was an error in fetching the records'
                    })
                })
            }
        },
        created(){
            this.user = user
            this.getPatientsRecords()
        }
    }
</script>