<template>

    <body class="layout-centered bg-img" style="background-image: url(/src/assets/img/bg/2.jpg);">

        <main class="main-content">

            <div>
                <router-link to="/"><h1>MedBlocks</h1></router-link>
                <p>The secure solution to health records management using blockchain</p>
                <button class="btn btn-danger">Know more</button>
            </div>
    
            <div class="bg-white rounded shadow-7 w-400 mw-100 p-6">
                <h5 class="mb-7">Sign into your account</h5>
    
                <form>
                    
                    <div class="form-group">
                        <input type="text" class="form-control" v-model="user.id" name="id" placeholder="MedBlock ID">
                    </div>
            
                    <div class="form-group">
                        <input type="password" class="form-control" v-model="user.password" name="password" placeholder="Password">
                    </div>

                    <div class="form-group">
                        <select class="form-control" v-model="user.role" name="role">
                            <option value="">Select Role</option>
                            <option value="doctor">Doctor</option>
                            <option value="patient">Patient</option>
                        </select>
                    </div>
    
                    <div class="form-group flexbox py-3">
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" checked>
                            <label class="custom-control-label">Remember me</label>
                        </div>
            
                        <a class="text-muted small-2" href="">Forgot password?</a>
                    </div>
    
                    <div class="form-group">
                        <button type="button" class="btn btn-block btn-primary" :disabled="!isValidLoginForm" @click="loginUser">Login</button>
                    </div>

                </form>

                <hr class="w-30">
    
                <p class="text-center text-muted small-2">Don't have an account? <router-link to="/register">Register here</router-link></p>

            </div>
    
        </main>
    
    </body>

</template>
<script>
    export default {
        data(){
            return {
                user: {
                    id: '',
                    password: '',
                    role: '',
                }
            }
        },
        methods: {
            loginUser(){
                fetch('http://localhost:8000/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: this.user.id,
                        password: this.user.password,
                        role: this.user.role,
                    })
                })
                .then(res => {
                    res.json()
                    .then(res => {
                        localStorage.setItem('token', res.token);
                        localStorage.setItem('userId', res.userID);
                        const remainingMilliseconds = 8640000
                        const expiryDate = new Date(
                            new Date().getTime() + remainingMilliseconds
                        );
                        localStorage.setItem('expiryDate', expiryDate.toISOString());
                        if(res.role == 'doctor') this.$router.push('/doctor/'+ res.userID + '/dashboard')
                        else this.$router.push('/patient/'+ res.userID + '/dashboard')
                    })
                })
                .catch(err => {
                    Toast.fire({
                        type: 'error',
                        title: 'There was an error in logging into your account'
                    })
                })
            }
        },
        computed: {
            isValidLoginForm(){
                return this.user.password && this.user.role
            }
        }
    }
</script>