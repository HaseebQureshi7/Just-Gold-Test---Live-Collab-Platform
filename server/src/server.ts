// src/server.ts
import { createServer } from "http";
import { Server as SocketServer } from "socket.io";
import app from "./app.ts";
import startup from "./startup.ts";
import { initializeSocket } from "./infrastructure/web-sockets/socketHandler.ts";

const PORT = process.env.PORT || 3001;

const httpServer = createServer(app);

// WebSocket init with socket.io
const io = new SocketServer(httpServer, {
  cors: {
    origin: "*", // Adjust in production
    methods: ["GET", "POST"],
  },
});

initializeSocket(io);

httpServer.listen(PORT, async () => {
  console.log(`🚀 Server running at: http://localhost:${PORT}`);
  await startup();
});
