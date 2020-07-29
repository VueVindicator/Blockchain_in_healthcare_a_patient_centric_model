<template>
    <div class="col-md-12">
        <h2>Connection Requests</h2>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Doctor ID</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="request of requests">
                    <td scope="row">1</td>
                    <td>{{request.requestSender}}</td>
                    <td>
                        <button class="btn btn-danger" @click="declineRequest(request)">Decline request</button>
                        <button class="btn btn-success" @click="confirmRequest(request)">Confirm request</button>
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
                },
                message: '',
                requests: []
            }
        },
        methods: {
            confirmRequest(request){
                this.$Progress.start()
                fetch('http://localhost:8000/confirmrequest', {
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        requestID: request._id,
                        sender: request.requestSender
                    })
                })
                .then(res => {
                    res.json()
                    .then(result => {
                        Toast.fire({
                            type: 'success',
                            title: result.message
                        })
                        this.$Progress.finish();
                        Fire.$emit('AfterCreate');
                    })
                })
                .catch(err => {
                    this.$Progress.fail()
                    Toast.fire({
                        type: 'error',
                        title: 'The request could not be confirmed'
                    })
                })
            },
            declineRequest(request){
                this.$Progress.start()
                fetch('http://localhost:8000/declinerequest', {
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        requestID: request._id,
                        sender: request.requestSender
                    })
                })
                .then(res => {
                    res.json()
                    .then(result => {
                        Toast.fire({
                            type: 'success',
                            title: result.message
                        })
                        this.$Progress.finish();
                        Fire.$emit('AfterCreate');
                    })
                })
                .catch(err => {
                    this.$Progress.fail()
                    Toast.fire({
                        type: 'error',
                        title: 'The request could not be declined'
                    })
                })
            },
            fetchRequests(){
                fetch('http://localhost:8000/patientrequests', {
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    }, 
                })
                .then(res => {
                    res.json()
                    .then(result => {
                        console.log(result)
                        this.requests = result.requests
                    })
                })
                .catch(err => {
                    Toast.fire({
                        type: 'error',
                        title: 'The requests could not be fetched'
                    })
                })
            }
        },
        created(){
            this.fetchRequests()
            Fire.$on('AfterCreate', () => {
                this.fetchRequests();
            });
        }
    }
</script>