import { Server, Socket } from "socket.io";

interface Member {
  id: string;
  name: string;
}

interface Room {
  sockets: Map<string, string>; // Maps socket.id -> userId
  users: Member[]; // Array of member objects
}

const rooms: Record<string, Room> = {};

export const initializeSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("Client connected:", socket.id);

    socket.on("join-room", ({ roomId, userId, userName }) => {
      if (!rooms[roomId]) {
        rooms[roomId] = { sockets: new Map(), users: [] };
      }

      if (!rooms[roomId].users.find((member) => member.id === userId)) {
        rooms[roomId].users.push({ id: userId, name: userName });
      }

      rooms[roomId].sockets.set(socket.id, userId);
      socket.join(roomId);

      console.log(`User ${userId} (${userName}) joined room ${roomId}`);
      console.log(`Room ${roomId} has ${rooms[roomId].users.length} members`);

      io.to(roomId).emit("room-members", { members: rooms[roomId].users });
    });

    // Offer
    socket.on("offer", ({ roomId, senderId, receiverId, sdp }) => {
      const receiverSocketId = Array.from(rooms[roomId].sockets.entries())
        .find(([sockId, uid]) => uid === receiverId)?.[0];

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("offer", { senderId, sdp });
        console.log(`Sent offer from ${senderId} to ${receiverId}`);
      }
    });

    // Answer
    socket.on("answer", ({ roomId, senderId, receiverId, sdp }) => {
      const receiverSocketId = Array.from(rooms[roomId].sockets.entries())
        .find(([sockId, uid]) => uid === receiverId)?.[0];

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("answer", { senderId, sdp });
        console.log(`Sent answer from ${senderId} to ${receiverId}`);
      }
    });

    // ICE Candidate
    socket.on("ice-candidate", ({ roomId, senderId, receiverId, candidate }) => {
      const receiverSocketId = Array.from(rooms[roomId].sockets.entries())
        .find(([sockId, uid]) => uid === receiverId)?.[0];

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("ice-candidate", { senderId, candidate });
        console.log(`Sent ICE candidate from ${senderId} to ${receiverId}`);
      }
    });

    // Mute status
    socket.on("mute-status", ({ roomId, userId, muted }) => {
      socket.to(roomId).emit("mute-status", { userId, muted });
    });

    // Video status
    socket.on("video-status", ({ roomId, userId, videoOn }) => {
      socket.to(roomId).emit("video-status", { userId, videoOn });
    });

    // Canvas state
    socket.on("new-canvas-state", ({ roomId, canvasState }) => {
      console.log("New canvas state received for Room:", roomId);
      socket.to(roomId).emit("new-canvas-state", canvasState);
    });

    socket.on("new-canvas-start", ({ roomId }) => {
      console.log("New canvas started message received for Room:", roomId);
      socket.to(roomId).emit("new-canvas-started");
    });

    socket.on("no-canvas-mode", ({ roomId }) => {
      console.log("No canvas mode has been started received for Room:", roomId);
      socket.to(roomId).emit("no-canvas-mode");
    });

    socket.on("canvas-stroke", ({ roomId, stroke }) => {
      socket.to(roomId).emit("canvas-stroke", { roomId, stroke });
    });

    socket.on("canvas-clear", ({ roomId }) => {
      socket.to(roomId).emit("canvas-clear", { roomId });
    });

    socket.on("disconnect", () => {
      let removedUserId: string | undefined;
      let roomIdToUpdate: string | undefined;

      for (const roomId in rooms) {
        if (rooms[roomId].sockets.has(socket.id)) {
          removedUserId = rooms[roomId].sockets.get(socket.id)!;
          rooms[roomId].sockets.delete(socket.id);

          const stillConnected = Array.from(rooms[roomId].sockets.values())
            .includes(removedUserId);
          if (!stillConnected && removedUserId) {
            rooms[roomId].users = rooms[roomId].users.filter(
              (member) => member.id !== removedUserId
            );
          }

          roomIdToUpdate = roomId;
          break;
        }
      }

      if (roomIdToUpdate) {
        io.to(roomIdToUpdate).emit("room-members", {
          members: rooms[roomIdToUpdate].users,
        });
      }

      console.log("Client disconnected:", socket.id);
    });
  });
};
