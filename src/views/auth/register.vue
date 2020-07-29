<template>

    <body class="layout-centered bg-img" style="background-image: url(/src/assets/img/bg/2.jpg);">

        <main class="main-content">

            <div>
                <router-link to="/"><h1>MedBlocks</h1></router-link>
                <p>The secure solution to health records management using blockchain</p>
                <button class="btn btn-primary">Know more</button>
            </div>
    
            <div class="bg-white rounded shadow-7 w-400 mw-100 p-6">
                <h5 class="mb-7">Create a new account</h5>
    
                <form>

                    <div class="form-group">
                        <input type="text" class="form-control" v-model="user.name" name="name" placeholder="Name">
                    </div>
                    
                    <div class="form-group">
                        <input type="email" class="form-control" v-model="user.email" name="email" placeholder="Email">
                    </div>
            
                    <div class="form-group">
                        <input type="password" class="form-control" v-model="user.password" name="password" placeholder="Password">
                    </div>

                    <div class="form-group">
                        <select class="form-control" placeholder="Select Role" v-model="user.role" name="role">
                            <option value="">Select Role</option>
                            <option value="doctor">Doctor</option>
                            <option value="patient">Patient</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <select class="form-control" placeholder="Select Sex" v-model="user.sex" name="sex">
                            <option value="">Select Sex</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <input type="text" v-show="user.role == 'patient'" class="form-control" v-model="user.secretPhrase" name="secretPhrase" placeholder="Secret Phrase (For Patient Signup)">
                    </div>
    
                    <div class="form-group flexbox py-3">
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" checked>
                            <label class="custom-control-label">Remember me</label>
                        </div>
            
                        <a class="text-muted small-2" href="">Forgot password?</a>
                    </div>
    
                    <div class="form-group">
                        <button class="btn btn-block btn-danger" type="button" :disabled="!isValidRegisterForm" @click="saveUser">Register</button>
                    </div>
                </form>

                <hr class="w-30">
    
                <p class="text-center text-muted small-2">Have an account? <router-link to="/login">Login here</router-link></p>

            </div>
    
        </main>
    
    </body>

</template>
<script>
    import crypto from 'crypto'
    export default {
        data(){
            return {
                user: {
                    name: '',
                    email: '',
                    password: '',
                    role: '',
                    secretPhrase: '',
                    sex: ''
                },
                key: 'Medblocks-a-patient-centric-syst',
                iv: crypto.randomBytes(16)
            }
        },
        methods: {
            encrypt(text) {
                let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(this.key), this.iv);
                let encrypted = cipher.update(text);
                encrypted = Buffer.concat([encrypted, cipher.final()]);
                return { iv: this.iv.toString('hex'), encryptedData: encrypted.toString('hex') };
            },
            emailIsValid() {
              if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.user.email)){
                return (true)
              } else {
                return (false)
              }
            },
            saveUser() {
                var encrypted = this.encrypt(this.user.secretPhrase)
                fetch('http://localhost:8000/auth/register', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: this.user.name,
                        email: this.user.email,
                        password: this.user.password,
                        secretPhrase: encrypted,
                        role: this.user.role,
                        sex: this.user.sex,
                    })
                })
                .then(res => {
                    this.$router.push('/login');
                })
                .catch(err => {
                    Toast.fire({
                        type: 'error',
                        title: 'There was an error signing you up'
                    })
                })
            }
        },
        computed: {
            isValidRegisterForm(){
                return this.emailIsValid() && this.user.password && this.user.role && this.user.sex
            }
        }
    }
</script>