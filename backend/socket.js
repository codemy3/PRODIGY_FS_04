import { Server } from "socket.io";

export const socketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log("✅ Socket.IO server already running.");
    return res.status(200).end();
  }

  console.log("🚀 Starting Socket.IO server...");

  const io = new Server(res.socket.server, {
    path: "/api/socket", // This ensures the correct route for socket.io connection
  });

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("sendMessage", (message) => {
      console.log("Message received:", message);
      io.emit("receiveMessage", message); // Broadcast message to all connected clients
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  res.socket.server.io = io;
  res.status(200).end();
};

export default socketHandler;
