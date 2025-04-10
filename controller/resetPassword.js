const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
const bcryptjs = require("bcryptjs");

async function resetPassword(req, res) {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;
    console.log("Incoming request to reset password");
console.log("Token:", token);
console.log("New Password:", newPassword);

    if (!token || !newPassword) {
      return res.status(400).json({
        message: "Token and new password are required",
        error: true,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);

    console.log("Decoded Token:", decoded);
    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
      });
    }

    user.password = await bcryptjs.hash(newPassword, 10);
    await user.save();

    return res.status(200).json({
      message: "Password reset successfully",
      success: true,
    });
  } catch (error) {
    console.error("Reset password error:", error.name, error.message);
    return res.status(500).json({
      message: "Something went wrong",
      error: true,
    });
  }
  
  
}

module.exports = resetPassword 
