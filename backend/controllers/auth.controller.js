import bcryptjs from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import { generateTokens, setCookies } from "../utils/generateTokenAndSetCookie.js";
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../lib/mailtrap/emails.js";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Please provide all fields" });
    }

    const usernameAlreadyExist = await User.findOne({ username });
    if (usernameAlreadyExist) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const userAlreadyExist = await User.findOne({ email });
    if (userAlreadyExist) {
      return res.status(400).json({ error: "User already exists. Please login." });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpire: Date.now() + 60 * 60 * 1000, // 1 hour in milliseconds
    });

    await user.save();

    const { accessToken, refreshToken } = generateTokens(user._id);
    setCookies(res, accessToken, refreshToken);

    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in signup:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ succses: false, error: "Email not found. Please register first or check your email" });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, error: "Invalid password" });
    }

    const { accessToken, refreshToken } = generateTokens(user._id);
    setCookies(res, accessToken, refreshToken);
    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in login:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const accessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.json({
      success: true,
      message: "Token refreshed successfully",
      user: user,
    });
  } catch (error) {
    console.log("Error in refreshToken controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createNewVerifyEmail = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ error: "Email already verified" });
    }

    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    user.verificationToken = verificationToken;
    user.verificationTokenExpire = Date.now() + 60 * 60 * 1000; // 1 hour in milliseconds

    await user.save();

    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      success: true,
      message: "New verification email sent successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in createNewVerifyEmail:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;

  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired verification code" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpire = undefined;

    await user.save();

    await sendWelcomeEmail(user.email, user.username);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in verifyEmail:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const resetPasswordToken = crypto.randomBytes(20).toString("hex");
    const resetPasswordExpire = Date.now() + 60 * 60 * 1000; // hour in milliseconds

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpire = resetPasswordExpire;

    await user.save();

    await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`);

    res.status(200).json({ success: true, message: "Password reset email sent successfully" });
  } catch (error) {
    console.log("Error in forgotPassword:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    user.password = hashedPassword;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    await sendResetSuccessEmail(user.email);

    res.status(200).json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.log("Error in resetPassword:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in checkAuth:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
