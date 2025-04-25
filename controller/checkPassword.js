const UserModel = require("../models/UserModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function checkPassword(request, response) {
  try {
    const { password, userId } = request.body;

    const user = await UserModel.findById(userId);

    if (!user) {
      return response.status(404).json({
        message: "User not found",
        error: true,
      });
    }

    const verifyPassword = await bcryptjs.compare(password, user.password);

    if (!verifyPassword) {
      return response.status(400).json({
        message: "Please check password",
        error: true,
      });
    }

    const tokenData = {
      id: user._id,
      email: user.email,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRETKEY, {
      expiresIn: "1d",
    });

    const cookieOptions = {
      http: true,
      https: true,
      secure: true,
    };

    return response
      .cookie("token", token, cookieOptions)
      .status(200)
      .json({
        message: "Login successfully",
        token: token,
        success: true,
        _id: user._id,
        name: user.name,
        email: user.email,
        profile_pic: user.profile_pic || "",
      });

  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = checkPassword;
