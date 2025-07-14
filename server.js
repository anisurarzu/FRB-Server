const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const hotelCategoryRoutes = require("./routes/hotelCategoryRoutes");
const roomRoutes = require("./routes/roomRoutes");
const hotelRoutes = require("./routes/hotelRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const dailySummaryRoutes = require("./routes/dailySummary");
const expenseRoutes = require("./routes/expense");
const permissionRoutes = require("./routes/permissionRoutes"); // Import permission routes
require("dotenv").config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", hotelCategoryRoutes);
app.use("/api", roomRoutes);
app.use("/api", hotelRoutes);
app.use("/api", bookingRoutes);
app.use("/api", dailySummaryRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api", permissionRoutes); // Add permission routes under /api

// Root Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
