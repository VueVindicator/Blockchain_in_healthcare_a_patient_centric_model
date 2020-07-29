<template>
    <div class="col-md-12">
        <h2>Record Information</h2>
        <br>
        <div class="col-md-12">

            <h3>{{record.title}}</h3>

            <p>{{record.body}}</p>

        </div>
        <br>
        <router-link to="/doctor/123/patient-list" class="btn btn-primary">Back to patient List</router-link>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                record: {
                    title: '',
                    body: ''
                }
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
                        patientID: this.$route.params.id,
                        recordID: this.$route.params.recordID,
                    })
                })
                .then(res => {
                    res.json()
                    .then(res => {
                        this.record.title = res.recordTitle
                        let encrecord = Buffer.from(res.recordBody, 'base64')
                        this.record.body = encrecord.toString('ascii')
                    })
                })
            }
        },
        created(){
            this.getRecord()
        }
    }
</script>