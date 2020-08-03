<template>
    <div class="col-md-12">
        <h2>Upload new record for Patient</h2>
        <br>
        <p>Enter a new record</p>
        <br>
        <form class="input-line">
            <label>Record Title</label>
            <div class="form-group">
                <input type="text" class="form-control" v-model="record.title" name="title" placeholder="Enter title">
            </div>
            <br>
            <label>Record Body</label>
            <ckeditor :editor="editor" v-model="record.body" :config="editorConfig"></ckeditor>
            <br>
            <div class="btn-group">
                <button class="btn btn-primary" type="button" @click="uploadRecord">Upload file</button>
                <button class="btn btn-primary" type="button" @click="uploadRecord">Submit</button>
            </div>
        </form>
    </div>
</template>
<script>
    import crypto from 'crypto'
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
    export default {
        data(){
            return{
                decryptionKey: '',
                record: {
                    title: '',
                    body: ''
                },
                encryptedrecord: '',
                editor: ClassicEditor,
                editorConfig: {
                    //
                }
 
            }
        },
        methods: {
            getKey(){
                fetch('http://localhost:8000/getKey', {
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        patientID: this.$route.params.id
                    })
                }).then(res => {
                    res.json()
                    .then(response => {
                        console.log(response)
                        this.decryptionKey = response.key
                    })
                })
            },
            uploadRecord(){
                const encryptedData = crypto.publicEncrypt(
                    {
                        key: this.decryptionKey,
                        // padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                        oaepHash: "sha256",
                    },
                    Buffer.from(this.record.body)
                )
                
                this.encryptedrecord = encryptedData.toString('base64')

                fetch('http://localhost:8000/uploadrecord', {
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer ' + token,
                        //'Content-Length': Buffer.byteLength(encryptedData),
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        patientID: this.$route.params.id,
                        recordtitle: this.record.title,
                        recordbody: this.encryptedrecord
                    })
                })
                .then(res => {
                    res.json()
                    .then(res => {
                        this.record = {
                            title: '',
                            body: ''
                        }
                        Toast.fire({
                            type: 'success',
                            title: 'The record has been uploaded'
                        })
                    })
                })
                .catch(err => {
                    Toast.fire({
                        type: 'error',
                        title: 'There was an error in uploading the patient\'s record'
                    })
                })
            }
        },
        created(){
            this.getKey()
        }
    }
</script>
