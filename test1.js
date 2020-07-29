// const path = require('path');
// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();

const crypto = require('crypto');

// const privateKey ='hello from the other';
// const cipher = crypto.createCipher('aes128', privateKey);
// var encrypted = cipher.final('hex')
// console.log(encrypted, 'patients key');

// const cipher2 = crypto.createCipher('aes128', 'f3e72f8c4caf39ad835532081f85be73');
// var encrypted2 = cipher2.update('doctor 1', 'utf8', 'hex');
// encrypted2 += cipher2.final('hex')
// console.log(encrypted2, 'doctors encryption key');

// //f3e72f8c4caf39ad835532081f85be73

// const record ='crypto@123';
// const cipher3 = crypto.createCipher('aes128', 'dc975c0ef62c9035e5e9219b62d223ab');
// var encrypted = cipher3.update(record, 'utf8', 'hex');
// encrypted += cipher3.final('hex');
// console.log(encrypted, 'encrypted record');

// const encrypt_record = '083424adecd24a05b13b18c4a5a02b62';
// const decipher = crypto.createDecipher('aes128','f3e72f8c4caf39ad835532081f85be73');
// //decipher;
// var decrypted = decipher.update(encrypt_record,'hex', 'utf8');
// decrypted += decipher.final('utf8');
// console.log(decrypted);

// app.use('/', (req, res, next) => {
//     //
// })

// app.listen(8000)
// console.log('Listening');

const key = 'Medblocks-a-patient-centric-syst'
const iv = crypto.randomBytes(16);
const algorithm = 'aes-256-cbc';

function encrypt(text) {
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
   }
   
   function decrypt(text) {
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
   }

   const encrypted = encrypt('hello from the other')
   console.log(encrypted)
   const decrypted = decrypt(encrypted)
   console.log(decrypted)