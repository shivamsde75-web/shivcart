const User = require("../model/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const isProduction = process.env.NODE_ENV?.toLowerCase() === "production";
const cookieOptions = {
  httpOnly: true,
  sameSite: isProduction ? "none" : "lax",
  secure: isProduction,
  path: "/",
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const setAuthCookie = (res, token) => {
  res.cookie("token", token, cookieOptions);
};

const registerUser = async (req, res) => {
  const { name, email, password, role, otp } = req.body;

  try {
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const selectedRole = role === "admin" ? "admin" : "user";
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: selectedRole,
      otp,
    });

    const token = generateToken(newUser._id);
    setAuthCookie(res, token);

    const userResponse = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      otp: newUser.otp,
      role: newUser.role,
      verified: newUser.verified,
    };

    return res.status(201).json({
      user: userResponse,
      message: "User registered successfully.",
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user._id);
    setAuthCookie(res, token);

    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      verified: user.verified,
    };

    return res.json({
      user: userResponse,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const logoutUser = async (req, res) => {
  res.clearCookie("token", { ...cookieOptions });
  return res.json({ message: "User logged out successfully" });
};
const me = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    return res.json({ user: user ? user.toObject() : null });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  logoutUser,
  me,
};
