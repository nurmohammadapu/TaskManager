const { error } = require("console");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { resetPasswordToken,passwordUpdated } = require("../mail/templates/passwordUpdate");

// resetPasswordToken Controller
exports.resetPasswordToken = async (req, res) => {
  try {
    // Get data
    const { email } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email: email });

    // If user does not exist, return a response
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered. Please sign up first.",
      });
    }

    // Generate a token
    const token = crypto.randomUUID();

    // Update user with the token and expiration time
    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 3600000, // 1 hour expiration
      },
      { new: true }
    );

    // Create URL for password reset
    const url = `http://localhost:5000/update-password/${token}`;

    // Send email with reset URL
    await mailSender(
      email,
      "Password Reset Link",
      resetPasswordToken(updatedDetails.email, updatedDetails.name, token) // Passing updatedDetails
    );

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Email sent successfully. Please check your email to change your password.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while sending reset password email. Please try again.",
      error: err.message, // Provide more detail on the error
    });
  }
};

// resetPassword Controller
exports.resetPassword = async (req, res) => {
    try {
      // Get data
      const { password, confirmPassword, token } = req.body;
  
      // Validation
      if (password !== confirmPassword) {
        return res.status(400).json({
          success: false,
          message: "The Password & confirm password do not match",
        });
      }
  
      // Get user details from db using token
      const userDetails = await User.findOne({ token: token });
  
      if (!userDetails) {
        return res.status(401).json({
          success: false,
          message: "Token is invalid",
        });
      }
  
      if (userDetails.resetPasswordExpires < Date.now()) {
        return res.status(403).json({
          success: false,
          message: "Token has expired. Please regenerate your token.",
        });
      }
  
      // Concatenate firstName and lastName
      const fullName = `${userDetails.firstName} ${userDetails.lastName}`;
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Update password
      await User.findOneAndUpdate(
        { token: token },
        { password: hashedPassword },
        { new: true }
      );
  
      // Send password updated email
      await mailSender(
        userDetails.email,
        "Password Updated Successfully",
        passwordUpdated(fullName, userDetails.email) // Pass full name
      );
  
      // Return response
      return res.status(200).json({
        success: true,
        message: "Password reset successful.",
      });
    } catch (err) {
      console.error("Error in resetPassword:", err);
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  };
  
