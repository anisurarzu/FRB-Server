const WebUser = require("../models/WebUser");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Register User
const registerUser = async (req, res) => {
  const { firstName, lastName, username, phone, address, email, password } =
    req.body;

  try {
    const userExists = await WebUser.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await WebUser.create({
      firstName,
      lastName,
      username,
      phone,
      address,
      email,
      password,
    });

    if (newUser) {
      res.status(201).json({
        _id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        username: newUser.username,
        email: newUser.email,
        token: generateToken(newUser.id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  console.log("email", username);
  try {
    const user = await WebUser.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log("User found:", user); // Debugging
    console.log("Entered Password:", password); // Debugging
    console.log("Stored Hashed Password:", user.password); // Debugging

    const isMatch = await user.matchPassword(password);
    console.log("Password Match:", isMatch); // Debugging

    if (isMatch) {
      res.json({
        _id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get User Profile (Protected)
const getProfile = async (req, res) => {
  const user = await WebUser.findById(req.user.id);

  if (user) {
    res.json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

module.exports = { registerUser, loginUser, getProfile };
