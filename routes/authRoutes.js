// routes/authRoutes.js
const express = require("express");
const { register, login } = require("../controllers/authController");
const { getAllUsers, updateUser } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Protected routes
router.get("/users", protect, getAllUsers); // Get all users
router.put("/users/:id", protect, updateUser); // Update user info

module.exports = router;
