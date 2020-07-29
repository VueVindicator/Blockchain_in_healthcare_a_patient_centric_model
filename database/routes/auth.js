const express = require('express')

const authController = require('../controllers/auth')

const router = express.Router();

router.put('/register', authController.Signup);
router.post('/login', authController.Login);

module.exports = router;