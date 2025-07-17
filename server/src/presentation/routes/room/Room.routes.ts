import { Router } from "express";
import { RoomRepositoryImpl } from "../../../infrastructure/repositories/room/Room.impl.ts";
import { RoomController } from "../../controllers/room/Room.controller.ts";
import { AuthenticateUser } from "../../../shared/middlewares/auth.middleware.ts";

const roomRouter = Router();
const roomRepo = new RoomRepositoryImpl();
const roomController = new RoomController(roomRepo);

roomRouter.post("/", AuthenticateUser, roomController.createRoom);
roomRouter.get("/:id", AuthenticateUser, roomController.getRoomById);
roomRouter.patch("/:id", AuthenticateUser, roomController.updateRoom);
roomRouter.delete("/:id", AuthenticateUser, roomController.deleteRoom);

export default roomRouter;
