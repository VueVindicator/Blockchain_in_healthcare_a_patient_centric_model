<template>
    <div class="col-md-12">
        <h2>Record Information</h2>
        <br>
        <div class="col-md-12">

            <h3>{{record.title}}</h3>

            <p>{{record.body}}</p>

        </div>
        <br>
        <router-link to="/patient/records" class="btn btn-primary">Back to Records List</router-link>
    </div>
</template>
<script>
    import crypto from 'crypto'
    export default {
        data(){
            return {
                record: {
                    title: '',
                    body: ''
                },
                user: {}
            }
        },
        methods: {
            getRecord(){
                fetch('http://localhost:8000/getrecord', {
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        patientID: this.user.userID,
                        recordID: this.$route.params.recordID,
                    })
                })
                .then(res => {
                    res.json()
                    .then(res => {
                        this.record.title = res.recordTitle
                        const enc = Buffer.from(res.recordBody, 'base64')
                        this.record.body = enc.toString('ascii')
                    })
                })
            },
            
        },
        created(){
            this.user = user
            this.getRecord()
        }
    }
</script>