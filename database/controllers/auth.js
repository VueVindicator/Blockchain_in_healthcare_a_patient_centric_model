const uuid = require('uuid/v1');
const bcrypt = require('bcryptjs');
var ID = function () {
  return 'MB' + Math.random().toString(36).substr(2, 7).toUpperCase();
};
const crypto = require('crypto');
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken');
const Doctor = require('../models/doctor');
const Patient = require('../models/patient');
const { getMaxListeners } = require('../models/doctor');

//const key = 'Medblocks-a-patient-centric-syst'

exports.Login = (req, res, next) => {
    const id = req.body.id;
    const password = req.body.password;
    const role = req.body.role;
    let userLogged;

    if (role == 'doctor') userLogged = Doctor.findOne({ userID: id })
    else userLogged = Patient.findOne({ userID: id })

    userLogged
    .then(user => {
      if (!user) {
        const error = new Error('A user with that ID could not be found.');
        error.statusCode = 401;
        throw error;
      }
      bcrypt.compare(password, user.password)
      .then(isEqual => {
        if (!isEqual) {
          const error = new Error('Wrong password!');
          error.statusCode = 401;
          throw error;
        }

        jwt.sign({
          ID: user._id,
          userID: user.userID,
          username: user.name,
          role: user.role
        }, 'secretkey', (err, token) => {
              res.status(200).json({ token: token, userID: user.userID, role: user.role });
        })
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
  };

exports.Signup = (req, res, next) => {
    const email = req.body.email;
    const name = req.body.name;
    const secretPhrase = req.body.secretPhrase
    const password = req.body.password;
    const role = req.body.role;
    const sex = req.body.sex

    let userSign

    if (role == 'doctor') userSign = Doctor.findOne({ email: email })
    else userSign = Patient.findOne({ email: email })

    userSign.then((user) => {
      if(user){
        const error = new Error('Email Exists.');
        error.statusCode = 403;
        throw error;
      }else{

        if(role == 'patient' && secretPhrase == ''){
          const error = new Error('No secret phrase.');
          error.statusCode = 401;
          throw error;
        }
    
        let decrypted
    
        if(role == 'patient'){
          function decrypt(text) {
            let iv = Buffer.from(text.iv, 'hex');
            let encryptedText = Buffer.from(text.encryptedData, 'hex');
            let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(text.key), iv);
            let decrypted = decipher.update(encryptedText);
            decrypted = Buffer.concat([decrypted, decipher.final()]);
            return decrypted.toString();
          }
          decrypted = decrypt(secretPhrase)
        }else{
          decrypted = "None given"
        }
        
        const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 4096,
          publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
          },
          privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
            cipher: 'aes-256-cbc',
            passphrase: decrypted
          }
        })
        //}
    
        bcrypt
        .hash(password, 12)
        .then(hashedPw => {
            if(role == 'doctor'){
                const doctor = new Doctor({
                    email: email,
                    password: hashedPw,
                    name: name,
                    role: role,
                    sex: sex,
                    userID: ID()
                });
                return doctor.save()
            }else{
                const patient = new Patient({
                    email: email,
                    password: hashedPw,
                    name: name,
                    role: role,
                    sex: sex,
                    userID: ID(),
                    secretPhrase: secretPhrase,
                    publicKey: publicKey,
                    privateKey: privateKey
                });
                return patient.save();
            }
        })
        .then(result => {
          let transporter = nodemailer.createTransport({
            host: 'mail.shipizzyltd.com',
            port: 587,
            secure: false,
            auth: {
              user: 'shipizzy',
              pass: 'connected12345'
            },
            tls: {
              rejectUnauthorized: false
            }
          })
          
          let mailOptions = {
            from: '"MedBlock Contact" <david.ajayi.anu@gmail.com>',
            to: email,
            subject: 'Thanks for signing up on our platform',
            text: `Your MedBlock ID is ${ID()}`
          }

          transporter.sendMail(mailOptions, (error, info) => {
            if(error){
              console.log(error)
            }
            console.log('Message sent: %s', info.messageId)
          })

          res.status(201).json({ message: 'User created!', userId: result._id });
        })
        .catch(err => {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
        });
      }
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};