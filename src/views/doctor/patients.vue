<template>
    <div class="col-md-12">
        <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="fullPage"></loading>
        <h2>Patient List</h2>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Patient ID</th>
                    <th>Patient Information</th>
                    <th>View Records</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(patient, index) of patients">
                    <th scope="row">{{index + 1}}</th>
                    <td>{{patient.patientID}}</td>
                    <td>
                        <router-link to="" class="btn btn-info">View patient info</router-link>
                    </td>
                    <td>
                        <router-link :to="'/doctor/' + user.userID + '/patient-list/' + patient.patientID + '/records'" class="btn btn-success">View Records</router-link>
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
                isLoading: false,
                fullPage: true,
                patients: {},
                user: {}
            }
        },
        methods: {
            getPatients(){
                this.isLoading = true
                fetch('http://localhost:8000/getpatients', {
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => {
                    res.json()
                    .then(res => {
                        this.isLoading = false
                        this.patients = res.patients
                    })
                })
                .catch(err => {
                    Toast.fire({
                        type: 'error',
                        title: 'There was an error in fetching list of patient\'s'
                    })
                })
            },
        },
        created(){
            this.user = user
            this.getPatients()
        }
    }
</script>