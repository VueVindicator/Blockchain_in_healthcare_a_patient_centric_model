<template>
    <div class="container">
        <div class="row">
            <div class="col-md-7">
                <h2>My Dashboard</h2><hr><br>
                <div class="row">
                    <div class="col-md-6">
                        <div class="card card-1 shadow-4 hover-shadow-9">
                            <div class="card-body">
                                <div class="media">
                                    <div class="lead-6 line-height-1 text-danger w-70px"><i class="fa fa-users"></i></div>
                                    <div class="media-body">
                                        <h5>{{doctorNo}}</h5>
                                        <p>Doctors</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card card-2 shadow-4 hover-shadow-9">
                            <div class="card-body">
                                <div class="media">
                                    <div class="lead-6 line-height-1 text-danger w-70px"><i class="fa fa-file"></i></div>
                                    <div class="media-body">
                                        <h5>{{recordNo}}</h5>
                                        <p>Records</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br><br>
                <div class="row">
                    <div class="col-md-12">
                        <a class="card px-6 py-8 shadow-11 hover-shadow-9 text-default border" href="#">
                            <p><i class="icon-book-open lead-7 text-primary"></i></p>
                            <h5 class="fw-500 my-4">MedBlocks Docs</h5>
                            <p class="mb-0">Get started using MedBlocks. A dedicated platform to manage your records putting you in control of your data.</p>
                            <br>
                            <button class="btn btn-outline-primary btn-md">View Docs</button>
                        </a>
                    </div>
                </div>
            </div>
            <div class="col-md-5">
                <h2>Recent activity</h2>
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
                doctorNo: 0,
                recordNo: 0,
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
                        this.doctorNo = res.assigned
                        this.recordNo = res.records
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