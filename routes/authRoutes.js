const express = require('express');
const { signup, login, sendotp, logout } = require('../controllers/authController');
const {
    resetPasswordToken,
    resetPassword
  } = require('../controllers/ResetPassword');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/sendotp', sendotp);
router.post('/logout', logout);

// Route to send the password reset token
router.post('/reset-password-token', resetPasswordToken);

// Route to reset the password using the token
router.post('/reset-password', resetPassword);

module.exports = router;
