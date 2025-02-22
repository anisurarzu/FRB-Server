const { Server } = require("socket.io");

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5000", // Frontend URL
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ["websocket", "polling"], // Ensure WebSocket support
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("likeUpdated", (data) => {
      console.log("Like updated:", data);
      io.emit("likeUpdated", data); // Broadcast update to all users
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

const getIoInstance = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

module.exports = { initializeSocket, getIoInstance };
