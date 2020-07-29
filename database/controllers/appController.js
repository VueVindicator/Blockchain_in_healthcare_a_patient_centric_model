const fetch = require('node-fetch')
const jwt = require('jsonwebtoken')
// const { Crypto } = require("@peculiar/webcrypto");
// const crypto = new Crypto();
const crypto = require('crypto')
const Patient = require('../models/patient')
const Doctor = require('../models/doctor')
const Record = require('../models/records')

//const key = 'Medblocks-a-patient-centric-syst'

// Collective controllers

exports.getDashboard = (req, res) => {
    let user
    let assigned
    if(req.role == 'doctor') {
        user = Doctor.findOne({userID: req.userID})
    }
    else {
        user = Patient.findOne({userID: req.userID})
    }
    user.then(user => {
        assigned = req.role == 'doctor' ? user.patients.items.length: user.doctors.items.length
        console.log(assigned)
        res.status(200).json({activity: user.notifications.items, assigned: assigned})
    })
}

exports.getProfileInfo = (req, res) => {
    let user;
    if(req.role == 'doctor') user = Doctor.findOne({userID: req.userID})
    else user = Patient.findOne({userID: req.userID})
    user.then(user => {

        let prk
        let pbk

        if(req.role == 'patient'){
            prk = user.privateKey
            pbk = user.publicKey
        }else{
            prk = 'none'
            pbk = 'none'
        }
        
        res.status(200).json({
            profileName: user.name,
            profileEmail: user.email,
            pbk: pbk,
            prk: prk
        })
    })
}

exports.editProfileInfo = (req, res) => {
    const name = req.body.name
    const email = req.body.email
    if(req.role == 'doctor') user = new Doctor
    else user = new Patient
    const usersave = user({
        name: name,
        email: email
    })
    return usersave.save()
}

// Doctor related controllers

exports.searchPatient = (req, res, next) => {
    const patientID = req.body.patientID;
    Patient.findOne({ userID: patientID })
    .then(user => {
        if(!user){
            const error = new Error('A Patient with this ID could not be found.');
            error.statusCode = 401;
            throw error;
        }else{
            res.status(200).json({ patientID: user.userID, status: res.statusCode.toString() });
        }
    })
}

exports.receiveRequest = (req, res, next) => {
    const patientID = req.body.patientID
    console.log(req.session)
    const request = {
        info: req.body.requestInfo,
        sender: req.userID
    }
    Patient.findOne({ userID: patientID })
    .then(patient => {
        const requestIndex = patient.requests.items.findIndex(cp => {
            return cp.requestSender === request.sender;
        });

        Doctor.findOne({ userID: req.userID })
        .then(doctor => {
            const connectionStatus = doctor.patients.items.findIndex(cp => {
                return cp.patientID === patientID;
            });
    
            if(connectionStatus >= 0){
                res.status(500).json({ message: 'You have already connected with this Patient', status: res.statusCode.toString() });
            }else{

                if(requestIndex >= 0){
                    res.status(500).json({ message: 'Request has already been sent to Patient', status: res.statusCode.toString() });
                }else{
        
                    fetch('http://localhost:3001/transaction/broadcast', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            title: request.info,
                            info: 'Sender issued connection request',
                            sender: request.sender,
                            recepient: patient.userID
                        })
                    })
                    fetch('http://localhost:3001/mine', {
                        method: 'GET'
                    })
                    .then(result => {
                        result.json()
                        .then(resultret => {
                            const updatedRequests = [...patient.requests.items];
                            updatedRequests.push({
                                requestInfo: request.info,
                                requestSender: request.sender,
                                requestTime: resultret.block.timestamp,
                                blockHash: resultret.block.hash
                            });
                            const updatedRequestsDatabase = {
                                items: updatedRequests
                            };
                            patient.requests = updatedRequestsDatabase;
    
                            patient.save();

                            const notifications = [...doctor.notifications.items];

                            notifications.push({
                                notification: `You sent a connection request to ${patientID}`,
                                exptime: Date.now() + 36000
                            })

                            const updatedNotifications = {
                                items: notifications
                            }

                            doctor.notifications = updatedNotifications;
                            doctor.save();

                            res.status(200).json({ message: 'Request has been sent to Patient', status: res.statusCode.toString() });
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }
            }
        })        
    })
}

exports.uploadRecord = (req, res) => {
    const patientID = req.body.patientID
    const title = req.body.recordtitle
    const encryptedRecord = req.body.recordbody
    const record = new Record({
        patientID: patientID,
        recordTitle: title,
        time: Date.now(),
        recordBody: encryptedRecord
    })
    let newRecord
    record.save()
    .then(response => {
        newRecord = response._id
        Patient.findOne({userID: patientID})
        .then(patient => {
            const updatedRecords = [...patient.records.items];
            updatedRecords.push({
                recordID: newRecord,
                senderID: req.userID,
            });
            const updatedRecordsDatabase = {
                items: updatedRecords
            };
            patient.records = updatedRecordsDatabase
            fetch('http://localhost:3001/transaction/broadcast', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: 'uploaded new record',
                    info: 'encrypted Record',
                    sender: req.userID,
                    recepient: patientID
                })
            })
            fetch('http://localhost:3001/mine', {
                method: 'GET'
            })
            patient.save();
            res.status(200).json({ message: 'Record uploaded' })
        })
    })
}

exports.getPatientRecords = (req, res, next) => {
    const patientID = req.body.patientID
    Doctor.findOne({ userID: req.userID })
    .then(doctor => {
        const patientRegistered = doctor.patients.items.findIndex(cp => {
            return cp.patientID === patientID;
        });
        if(patientRegistered >= 0) {
            Patient.findOne({ userID: patientID })
            .populate('records.items.recordID')
            .then(patient => {
                res.status(200).json({ patientRecords: patient.records.items, status: res.statusCode.toString() })
            })
        }else{
            res.status(500).json({ message: 'You are not authorized to view this patients records'})
        }
    })
}

exports.getRecord = (req, res) => {
    const recordID = req.body.recordID
    const patientID = req.body.patientID
    Doctor.findOne({ userID: req.userID })
    .then(doctor => {
        const patientRegistered = doctor.patients.items.findIndex(cp => {
            return cp.patientID === patientID;
        });
        if(patientRegistered >= 0) {
            Patient.findOne({ userID: patientID })
            .populate('records.items.recordID')
            .then(patient => {
                const record = patient.records.items.filter(cp => {
                    return cp.recordID._id.toString() === recordID.toString()
                })

                // async function main() {

                //     const encryptedMessage = Buffer.from(record[0].recordID.recordBody, "base64");
                    
                //     const pkcs8 = Buffer.from(patient.privateKey, "base64");

                //     const key = await crypto.subtle.importKey("pkcs8", pkcs8, { name: "RSA-OAEP", hash: "SHA-256" }, true, ["decrypt"]);

                //     const message = await crypto.subtle.decrypt("RSA-OAEP", key, encryptedMessage);
                    
                //     console.log(Buffer.from(message).toString("ascii"))
                
                // }

                // main()
                
                res.status(200).json({ recordBody: record[0].recordID.recordBody, recordTitle: record[0].recordID.recordTitle, secretPhrase: patient.secretPhrase, status: res.statusCode.toString() })
            })
        }else{
            res.status(500).json({ message: 'You are not authorized to view this patients records'})
        }
    })
}

exports.getPatients = (req, res, next) => {
    const doctorID = req.userID
    Doctor.findOne({ userID: doctorID })
    .then(doctor => {
        res.status(200).json({ patients: doctor.patients.items, status: res.statusCode.toString() })
    })
}

exports.getKey = (req, res, next) => {
    const patientID = req.body.patientID
    Doctor.findOne({userID: req.userID})
    .then(doctor => {
        const key = doctor.patients.items.filter(cp => {
            return cp.patientID === patientID
        })
        res.status(200).json({key: key[0].decryptionKey})
    })
}

// Patient related controllers

exports.patientRecords = (req, res) => {
    //
}

exports.getProviders = (req, res) => {
    const patientID = req.userID
    Patient.findOne({ userID: patientID })
    .then(patient => {
        res.status(200).json({ providers: patient.doctors.items, status: res.statusCode.toString() })
    })
}

exports.getRequests = (req, res, next) => {
    console.log(req.userID)
    Patient.findOne({ userID: req.userID })
    .then(patient => {
        const requests = patient.requests.items
        if(requests){
            res.status(200).json({ requests: requests, status: res.statusCode.toString() })
        }
    })
    .catch(err => {
        console.log(err)
    });
};

exports.confirmRequest = (req, res, next) => {
    const requestID = req.body.requestID
    const doctorID = req.body.sender

    fetch('http://localhost:3001/transaction/broadcast', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: 'Approved connection request',
            info: 'Sender connected with recepient',
            sender: req.userID,
            recepient: doctorID
        })
    })
    fetch('http://localhost:3001/mine', {
        method: 'GET'
    })
    .then(response => {
        Patient.findOne({ userID: req.userID })
        .then(patient => {
            const updatedRequests = patient.requests.items.filter(item => {
                return item._id.toString() !== requestID.toString()
            });
            patient.requests.items = updatedRequests

            const doctorIndex = patient.doctors.items.findIndex(cp => {
                return cp.doctorID === doctorID;
            });

            if(doctorIndex >= 0){
                console.log('Doctor found')
            }else{
                const updatedDoctorsList = [...patient.doctors.items];
                updatedDoctorsList.push({
                    doctorID: doctorID
                });
                const updatedDoctorsDatabase = {
                    items: updatedDoctorsList
                };
                patient.doctors = updatedDoctorsDatabase

                const notifications = [...patient.notifications.items];

                notifications.push({
                    notification: `You accepted a connection request from ${doctorID}`,
                    exptime: Date.now() + 36000
                })

                patient.notifications = {
                    items: notifications
                }

                patient.save()

                Doctor.findOne({ userID: doctorID })
                .then(doctor => {
                    const patientIndex = doctor.patients.items.findIndex(cp => {
                        return cp.patientID === req.userID;
                    });

                    if(patientIndex >= 0){
                        console.log('Patient found')
                    }else{
                        let publicKey = patient.publicKey

                        const updatedPatientList = [...doctor.patients.items];

                        updatedPatientList.push({
                            patientID: req.userID,
                            decryptionKey: publicKey,
                        });

                        const updatedPatientsDatabase = {
                            items: updatedPatientList
                        };

                        doctor.patients = updatedPatientsDatabase;

                        const notifications = [...doctor.notifications.items];

                        notifications.push({
                            notification: `${req.userID} accepted your connection request`,
                            exptime: Date.now() + 36000
                        })

                        doctor.notifications = {
                            items: notifications
                        }

                        doctor.save();
                    }
                })

                res.status(200).json({ message: "Request to connect has been approved" })
            }

        })
    })
    .catch(err => console.log(err));
};

exports.declineRequest = (req, res, next) => {
    const requestID = req.body.requestID
    const doctorID = req.body.sender

    fetch('http://localhost:3001/transaction/broadcast', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: 'Declined connection request',
            info: 'Sender declined connection request with recepient',
            sender: req.userID,
            recepient: doctorID
        })
    })
    fetch('http://localhost:3001/mine', {
        method: 'GET'
    })
    .then(response => {
        Patient.findOne({ userID: req.userID })
        .then(patient => {
            const updatedRequests = patient.requests.items.filter(item => {
                return item._id.toString() !== requestID.toString()
            });
            patient.requests.items = updatedRequests

            const notifications = [...patient.notifications.items];

            notifications.push({
                notification: `You declined a connection request from ${doctorID}`,
                exptime: Date.now() + 36000
            })

            updatedNotifications = {
                items: notifications
            }

            patient.notifications = updatedNotifications
            patient.save()

            Doctor.findOne({ userID: doctorID }).then(doctor => {
                const notifications = [...doctor.notifications.items];

                notifications.push({
                    notification: `${req.userID} declined your connection request`,
                    exptime: Date.now() + 36000
                })

                doctor.notifications = {
                    items: notifications
                }

                doctor.save();
            })

            res.status(200).json({ message: "Request to connect has been declined" })
        })
    })
    .catch(err => console.log(err));
};