const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Function to generate unique loginID like FTB-{random4digits}
function generateLoginID() {
  const randomDigits = Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit number
  return `FTB-${randomDigits}`;
}

// Register a new user
// Register a new user
const register = async (req, res) => {
  const {
    image,
    username,
    gender,
    email,
    password,
    plainPassword,
    phoneNumber,
    nid,
    currentAddress,
    role,
  } = req.body;

  try {
    // Generate unique loginID
    const loginID = generateLoginID();

    const roleInfo = {
      label: role.label,
      value: role.value,
    };

    await User.create({
      image,
      username,
      gender,
      email,
      password, // Will be hashed before saving
      plainPassword,
      phoneNumber,
      nid,
      currentAddress,
      role: roleInfo,
      loginID, // Store the generated loginID
    });

    // Send a confirmation message
    res.status(201).json({
      message: "Registration successful. Please log in to continue.",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// User login with loginID
const login = async (req, res) => {
  const { loginID, password } = req.body;

  try {
    const user = await User.findOne({ loginID });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        loginID: user.loginID,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        nid: user.nid,
        currentAddress: user.currentAddress,
        role: user.role,
        image: user.image,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      users: users.map((user) => ({
        id: user._id,
        loginID: user.loginID,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        nid: user.nid,
        currentAddress: user.currentAddress,
        role: user.role,
        image: user.image,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update user information
const updateUser = async (req, res) => {
  const { id } = req.params;
  const {
    image,
    username,
    gender,
    email,
    phoneNumber,
    nid,
    currentAddress,
    role,
  } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        image,
        username,
        gender,
        email,
        phoneNumber,
        nid,
        currentAddress,
        role: {
          label: role.label,
          value: role.value,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      user: {
        id: updatedUser._id,
        loginID: updatedUser.loginID,
        username: updatedUser.username,
        email: updatedUser.email,
        phoneNumber: updatedUser.phoneNumber,
        nid: updatedUser.nid,
        currentAddress: updatedUser.currentAddress,
        role: updatedUser.role,
        image: updatedUser.image,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  register,
  login,
  getAllUsers,
  updateUser,
};
