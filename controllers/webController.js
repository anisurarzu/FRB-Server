const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const WebUser = require("../models/WebUser");

const webRegister = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      username,
      email,
      phone,
      password,
      confirmPassword,
      address,
    } = req.body;

    // Trim inputs to remove accidental spaces
    const trimmedData = {
      firstName: firstName?.trim(),
      lastName: lastName?.trim(),
      username: username?.trim(),
      email: email?.trim(),
      phone: phone?.trim(),
      password,
      confirmPassword,
      address: address?.trim(),
    };

    // Check for missing fields
    const requiredFields = [
      "firstName",
      "lastName",
      "username",
      "email",
      "phone",
      "password",
      "confirmPassword",
      "address",
    ];
    const missingFields = requiredFields.filter((field) => !trimmedData[field]);

    if (missingFields.length) {
      return res
        .status(400)
        .json({
          error: `Missing required fields: ${missingFields.join(", ")}`,
        });
    }

    // Check if passwords match
    if (trimmedData.password !== trimmedData.confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match." });
    }

    // Check if the user already exists
    const existingUser = await WebUser.findOne({
      $or: [{ email: trimmedData.email }, { username: trimmedData.username }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or email already exists." });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(trimmedData.password, salt);

    // Create a new user
    const newUser = new WebUser({
      firstName: trimmedData.firstName,
      lastName: trimmedData.lastName,
      username: trimmedData.username,
      email: trimmedData.email,
      phone: trimmedData.phone,
      password: hashedPassword,
      address: trimmedData.address,
      loginHistory: [],
    });

    // Save user to database
    await newUser.save();

    res.status(201).json({
      message: "Registration successful. Please log in.",
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        username: newUser.username,
        email: newUser.email,
        phone: newUser.phone,
        address: newUser.address,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

const webLogin = async (req, res) => {
  try {
    const { username, password, latitude, longitude, publicIP, privateIP } =
      req.body;

    // Trim username input
    const trimmedUsername = username?.trim();

    // Check if username and password are provided
    if (!trimmedUsername || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required." });
    }

    // Find user by username
    const user = await WebUser.findOne({ username: trimmedUsername });
    if (!user) {
      return res.status(400).json({ error: "User not found." });
    }

    // Debugging logs
    console.log("Entered Password:", password);
    console.log("Stored Hashed Password:", user.password);

    // Compare entered password with hashed password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    // Store login details in loginHistory
    user.loginHistory.push({
      latitude,
      longitude,
      publicIP,
      privateIP,
      loginTime: new Date(),
    });

    // Save updated user login history
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10h",
    });

    // Send response
    res.status(200).json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        phone: user.phone,
        address: user.address,
        loginHistory: user.loginHistory,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

module.exports = {
  webRegister,
  webLogin,
};
