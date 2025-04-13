const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

const getUserDetailsFromToken = async (token) => {
  try {
    // Check if token exists and is a string
    if (!token || typeof token !== 'string') {
      return {
        message: "Session expired, please log in again.",
        logout: true,
      };
    }

    // Verify token
    const decoded = await jwt.verify(token, process.env.JWT_SECRETKEY);

    // Fetch user from the database using the decoded user ID
    const user = await UserModel.findById(decoded.id).select('-password');

    // If user is not found, return an error
    if (!user) {
      return {
        message: "User not found.",
        logout: true,
      };
    }

    // Return the user details
    return {
      message: "User found.",
      user: user,
    };
  } catch (error) {
    // Handle invalid token or other errors
    console.error(error);
    if (error.name === 'JsonWebTokenError') {
      return {
        message: "Invalid or expired token.",
        logout: true,
      };
    }
    return {
      message: "An error occurred while fetching user details.",
      logout: true,
    };
  }
};

module.exports = getUserDetailsFromToken;
