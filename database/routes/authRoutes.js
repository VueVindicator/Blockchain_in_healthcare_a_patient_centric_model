const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth')
const appController = require('../controllers/appController');

router.post('/patient', authMiddleware.auth, appController.searchPatient);
router.post('/request', authMiddleware.auth, appController.receiveRequest);
router.get('/getpatients', authMiddleware.auth, appController.getPatients);
router.get('/getdashboard', authMiddleware.auth, appController.getDashboard)
router.post('/getpatientrecords', authMiddleware.auth, appController.getPatientRecords);
router.post('/getKey', authMiddleware.auth, appController.getKey);
router.post('/getrecord', authMiddleware.auth, appController.getRecord);
router.post('/uploadrecord', authMiddleware.auth, appController.uploadRecord);
router.get('/patientrequests', authMiddleware.auth, appController.getRequests);
router.post('/confirmrequest', authMiddleware.auth, appController.confirmRequest);
router.post('/declinerequest', authMiddleware.auth, appController.declineRequest);
router.get('/getprofileinfo', authMiddleware.auth, appController.getProfileInfo);
router.post('/editprofileinfo', authMiddleware.auth, appController.editProfileInfo);
router.get('/patientrecords', authMiddleware.auth, appController.patientRecords);
router.get('/getproviders', authMiddleware.auth, appController.getProviders);
router.post('/revokeaccess', authMiddleware.auth, appController.revokeAccess);

module.exports = router;