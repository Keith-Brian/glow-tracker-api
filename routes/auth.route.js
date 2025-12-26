const express = require('express');
const router = express.Router();

// import the auth controller
const { getAllUsers, createUser, loginUser, findUserByEmail, verifyOtp, forgotPassword, resetPassword } = require('../controllers/auth.controller.js');

// route to get all users
router.get('/users', getAllUsers);

// route to create a new user
router.post('/register', createUser);

// route to login user
router.post('/login', loginUser);

// find user by email (for password reset)
router.get('/user', findUserByEmail); // change this to request query (?email=example)

// routes to handle user-otp functions
router.get('/verify', verifyOtp); // to be implemented
router.get('/forgot', forgotPassword);
router.get('/reset', resetPassword);
 
module.exports = router;

