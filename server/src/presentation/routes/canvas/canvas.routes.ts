import { Router } from "express";
import { CanvasRepositoryImpl } from "../../../infrastructure/repositories/canvas/Canvas.impl.ts";
import { CanvasController } from "../../controllers/canvas/Canvas.controller.ts";
import { AuthenticateUser } from "../../../shared/middlewares/auth.middleware.ts";

const canvasRouter = Router();
const canvasRepo = new CanvasRepositoryImpl();
const canvasController = new CanvasController(canvasRepo);

canvasRouter.post("/", AuthenticateUser, canvasController.create);
canvasRouter.get("/room/:roomId", AuthenticateUser, canvasController.findByRoomId);
canvasRouter.get("/:id", AuthenticateUser, canvasController.findById);
canvasRouter.patch("/:id", AuthenticateUser, canvasController.update);
canvasRouter.delete("/:id", AuthenticateUser, canvasController.delete);

export default canvasRouter;
