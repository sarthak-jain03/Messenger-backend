const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
const bcryptjs = require("bcryptjs");

async function resetPassword(req, res) {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({
        message: "Token and new password are required",
        error: true,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
    const userId = decoded.id;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found", error: true });
    }

    user.password = await bcryptjs.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: "Password reset successfully", success: true });

  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({
      message: error.message || "Something went wrong",
      error: true,
    });
  }
}

module.exports = resetPassword