<template>
    <div class="col-md-12">
        <div>
            <h2>Profile Information</h2>
        </div>
        <div class="accordion accordion-connected" id="accordion">

            <div class="card">
              <h5 class="card-title">
                <a data-toggle="collapse" href="#collapse-acc" class="collapsed" aria-expanded="false">General Information</a>
              </h5>

              <div id="collapse-acc" class="collapse" data-parent="#accordion">
                <button class="btn btn-success" @click="editMode">Edit Mode</button>
                <div class="card-body">
                    <div class="form-group">
                        <input type="name" class="form-control" :disabled="!edit" v-model="profileInfo.profileName" name="name" placeholder="Name">
                    </div>

                    <div class="form-group">
                        <input type="email" class="form-control" :disabled="!edit" v-model="profileInfo.profileEmail" name="email" placeholder="Email">
                    </div>

                    <div class="form-group">
                        <input type="text" class="form-control" disabled v-model="user.role" name="role" placeholder="Role">
                    </div>
                    
                </div>
                <button class="btn btn-success" @click="">Submit Changes</button>
              </div>
            </div>


            <div class="card">
              <h5 class="card-title">
                <a class="collapsed" data-toggle="collapse" href="#collapse-2-2" aria-expanded="false">Application Information</a>
              </h5>

              <div id="collapse-2-2" class="collapse" data-parent="#accordion">
                <div class="card-body">
                  <p>User ID: {{user.userID}}</p>
                  <p>Public key: {{profileInfo.pbk}}</p>
                  <p>Private Key: {{profileInfo.prk}}</p>
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
                edit: false,
                profileInfo: {},
                user: {}
            }
        },
        methods: {
            editMode(){
                this.edit = true
            },
            getProfileInfo(){
                fetch('http://localhost:8000/getprofileinfo',{
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
                        this.profileInfo = res
                    })
                })
                .catch(err => {
                    Toast.fire({
                        type: 'error',
                        title: 'There was an error in fetching profile information'
                    })
                })
            },
        },
        created(){
            this.user = user
            this.getProfileInfo()
        }
    }
</script>