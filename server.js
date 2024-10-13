const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const hotelCategoryRoutes = require("./routes/hotelCategoryRoutes");
const roomRoutes = require("./routes/roomRoutes");
const hotelRoutes = require("./routes/hotelRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
require("dotenv").config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Auth Routes
app.use("/api/auth", authRoutes);

// Hotel Category Routes
app.use("/api/hotel-categories", hotelCategoryRoutes);

// Room Routes
app.use("/api/rooms", roomRoutes);

// Hotel Routes
app.use("/api/hotels", hotelRoutes);

// Booking Routes
app.use("/api/bookings", bookingRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Listen on the specified port
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
