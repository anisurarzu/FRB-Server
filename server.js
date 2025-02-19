const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const hotelCategoryRoutes = require("./routes/hotelCategoryRoutes"); // Import slider routes
const roomRoutes = require("./routes/roomRoutes"); // Import slider routes
const hotelRoutes = require("./routes/hotelRoutes"); // Import hotel routes
const bookingRoutes = require("./routes/bookingRoutes"); // Import booking routes
const http = require("http");
const { initializeSocket } = require("./controllers/socketController");

require("dotenv").config();

const app = express();
//web socket
const server = http.createServer(app);

// Middleware
app.use(cors({ origin: "http://localhost:5000", methods: ["GET", "POST"], credentials: true }));
app.use(express.json());

// Initialize WebSocket
initializeSocket(server);


// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Auth Routes

app.use("/api/auth", authRoutes);

// Slider Routes
app.use("/api", hotelCategoryRoutes); // Add slider routes under /api

// Room Routes
app.use("/api", roomRoutes); // Add slider routes under /api

// Portfolio Routes
app.use("/api", hotelRoutes); // Add slider routes under /api

//Booking Routes
app.use("/api", bookingRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
