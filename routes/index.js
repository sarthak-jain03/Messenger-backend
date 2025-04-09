const express = require("express");
const registerUser = require("../controller/registerUser");
const checkEmail = require("../controller/checkEmail");
const checkPassword = require("../controller/checkPassword");
const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");
const userDetails = require("../controller/userDetails");
const logout = require("../controller/logout");
const updateUserDetails = require("../controller/updateUserDetails");
const searchUserSearchbox = require("../controller/searchUserSearchbox");

// New controllers
const forgotPassword = require("../controller/forgotPassword");
const resetPassword = require("../controller/resetPassword");

const router = express.Router();

// Register user
router.post('/register', registerUser);

// Check email
router.post('/email', checkEmail);

// Check password
router.post('/password', checkPassword);

// Get user details from token
router.get('/user-details', userDetails);

// Logout user
router.get('/logout', logout);

// Update user details
router.post('/update-user', updateUserDetails);

// Search user in searchbox
router.post('/search-user', searchUserSearchbox);

// Forgot password
router.post('/forgot-password', forgotPassword);

// Reset password using token
router.post('/reset-password/:token', resetPassword);

module.exports = router;