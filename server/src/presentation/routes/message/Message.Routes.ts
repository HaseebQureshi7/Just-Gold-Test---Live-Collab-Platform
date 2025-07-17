import { Router } from "express";
import { MessageRepositoryImpl } from "../../../infrastructure/repositories/message/Message.impl.ts";
import { MessageController } from "../../controllers/message/Message.controller.ts";
import { AuthenticateUser } from "../../../shared/middlewares/auth.middleware.ts";

const messageRouter = Router();
const messageRepo = new MessageRepositoryImpl();
const messageController = new MessageController(messageRepo);

// Routes with authentication middleware
messageRouter.post("/", AuthenticateUser, messageController.create);               // Create message
messageRouter.get("/:id", AuthenticateUser, messageController.findById);           // Find by ID
messageRouter.delete("/:id", AuthenticateUser, messageController.delete);          // Delete by ID
messageRouter.get("/room/:roomId", AuthenticateUser, messageController.getMessagesByRoom);  // Get by room

export default messageRouter;
