<template>
    <div class="col-md-12">
        <h2>Add new Patient</h2>
        <br>
        <form class="input-line">
            <div class="form-group input-group">
                <input type="text" class="form-control" v-model="patient.Id" placeholder="Search by Patients ID">
                <div class="input-group-append ml-4">
                    <button class="btn btn-primary" type="button" @click="searchPatient">Go!</button>
                </div>
            </div>
        </form>
        <table v-if="foundPatient" class="table table-hover">
            <thead>
                <tr>
                    <th>Patient ID</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">{{patient.foundID}}</th>
                    <td>
                        <button class="btn btn-success" @click="sendRequest">Send Request</button>
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
                patient: {
                    Id: '',
                    foundID: ''
                },
                foundPatient: false
            }
        },
        methods: {
            searchPatient(){
                fetch('http://localhost:8000/patient',{
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        patientID: this.patient.Id
                    })
                })
                .then(res => {
                    res.json()
                    .then(res => {
                        //if(res.status === '401') 
                        if(res.status === '200'){
                            this.foundPatient = true
                            this.patient.Id = ''
                            this.patient.foundID = res.patientID
                        }
                    })
                })
                .catch(err => {
                    Toast.fire({
                        type: 'error',
                        title: 'There was an error in searching for the patient'
                    })
                })
            },
            sendRequest(){
                this.$Progress.start()
                fetch('http://localhost:8000/request',{
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        patientID: this.patient.foundID,
                        requestInfo: 'Connection request'
                    })
                })
                .then(res => {
                    res.json()
                    .then(res => {
                        this.$Progress.finish();
                        if(res.status === '200' || res.status === '500'){
                            Toast.fire({
                                type: 'success',
                                title: res.message
                            })
                            this.foundPatient = false
                        }
                    })
                })
                .catch(err => {
                    Toast.fire({
                        type: 'error',
                        title: 'There was an error in sending the request'
                    })
                })
            }
        }
    }
</script>