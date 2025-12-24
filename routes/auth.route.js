const express = require('express');
const router = express.Router();

// import the auth controller
const { getAllUsers, createUser, loginUser, findUserByEmail } = require('../controllers/auth.controller.js');

// route to get all users
router.get('/users', getAllUsers);

// route to create a new user
router.post('/register', createUser);

// route to login user
router.post('/login', loginUser);

// find user by email (for password reset)
router.post('/user/email/:email', findUserByEmail);

module.exports = router;

