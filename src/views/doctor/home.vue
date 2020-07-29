<template>
    <div class="container">
        <div class="row">
            <div class="col-md-7">
                <h2>My Dashboard</h2><br>
                <div class="row">
                    <div class="col-md-6">
                        <div class="card shadow-4">
                            <div class="card-body">
                                <div class="media">
                                    <div class="lead-6 line-height-1 text-danger w-70px"><i class="fa fa-users"></i></div>
                                    <div class="media-body">
                                        <h5>{{patientNo}}</h5>
                                        <p>Patients</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card shadow-4">
                            <div class="card-body">
                                <div class="media">
                                    <div class="lead-6 line-height-1 text-danger w-70px"><i class="icon-recycle"></i></div>
                                    <div class="media-body">
                                        <h5>30</h5>
                                        <p>Patients</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-5">
                <h2>Recent Activity</h2>
                <div class="row">
                    <div class="col-md-12">
                        <p v-for="item in activity">{{item.notification}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                patientNo: 0,
                activity: '',
            }
        },
        methods: {
            getDashboard(){
                fetch('http://localhost:8000/getdashboard',{
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => {
                    res.json()
                    .then(res => {
                        console.log(res)
                        this.patientNo = res.assigned
                        this.activity = res.activity
                    })
                })
                .catch(err => {
                    Toast.fire({
                        type: 'error',
                        title: 'There was an error in fetching the Dashboard Information'
                    })
                })
            },
        },
        created(){
            this.getDashboard()
        }
    }
</script>