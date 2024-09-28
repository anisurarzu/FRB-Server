const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const hotelCategoryRoutes = require("./routes/hotelCategoryRoutes"); // Import slider routes
const serviceRoutes = require("./routes/serviceRoutes"); // Import slider routes
const portfolioRoutes = require("./routes/portfolioRoutes"); // Import slider routes
require("dotenv").config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Auth Routes

app.use("/api/auth", authRoutes);

// Slider Routes
app.use("/api", hotelCategoryRoutes); // Add slider routes under /api

// Service Routes
app.use("/api", serviceRoutes); // Add slider routes under /api

// Portfolio Routes
app.use("/api", portfolioRoutes); // Add slider routes under /api

// Root Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
