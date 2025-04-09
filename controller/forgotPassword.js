const crypto = require("crypto");
const UserModel = require("../models/UserModel");
const nodemailer = require("nodemailer");

require("dotenv").config();

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found with this email",
        error: true,
      });
    }

    // Generate secure token
    const token = crypto.randomBytes(32).toString("hex");

    // Save token and expiry to DB
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject: "Reset your password - Messenger App",
      html: `
        <h2>Hello ${user.name}</h2>
        <p>You requested a password reset.</p>
        <p>Click the link below to reset your password (valid for 15 minutes):</p>
        <a href="${resetLink}">${resetLink}</a>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      message: "Reset password email sent successfully",
      success: true,
    });
  } catch (error) {
    console.error("Forgot Password Error:", error.message);
    return res.status(500).json({
      message: error.message || "Something went wrong",
      error: true,
    });
  }
};

module.exports = forgotPassword;
