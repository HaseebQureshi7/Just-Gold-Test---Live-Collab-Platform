import { Request, Response } from "express";
import { CreateRoomDTO } from "../../../application/dtos/room/CreateRoom.dto.ts";
import { UpdateRoomDTO } from "../../../application/dtos/room/UpdateRoom.dto.ts";
import { RoomRepository } from "../../../domain/repositories/Room.repo.ts";
import { ResponseHandler } from "../../../shared/utils/ResponseHandler.ts";
import { catchAsync } from "../../../shared/utils/CatchAsync.ts";
import { CreateRoomUseCase } from "../../../application/use-cases/room/CreateRoom.uc.ts";
import { DeleteRoomUseCase } from "../../../application/use-cases/room/DeleteRoom.uc.ts";
import { FindRoomByIdUseCase } from "../../../application/use-cases/room/FindRoomById.uc.ts";
import { UpdateRoomUseCase } from "../../../application/use-cases/room/UpdateRoom.uc.ts";

export class RoomController {
  private createRoomUseCase: CreateRoomUseCase;
  private findRoomByIdUseCase: FindRoomByIdUseCase;
  private updateRoomUseCase: UpdateRoomUseCase;
  private deleteRoomUseCase: DeleteRoomUseCase;

  constructor(roomRepo: RoomRepository) {
    this.createRoomUseCase = new CreateRoomUseCase(roomRepo);
    this.findRoomByIdUseCase = new FindRoomByIdUseCase(roomRepo);
    this.updateRoomUseCase = new UpdateRoomUseCase(roomRepo);
    this.deleteRoomUseCase = new DeleteRoomUseCase(roomRepo);
  }

  createRoom = catchAsync(async (req: Request, res: Response) => {
    const { name, isPublic } = req.body;
    const roomDTO = new CreateRoomDTO({ name, isPublic });

    const room = await this.createRoomUseCase.execute(roomDTO);

    ResponseHandler.success(res, "Room created successfully", 201, { room });
  });

  getRoomById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const room = await this.findRoomByIdUseCase.execute(id);

    ResponseHandler.success(res, "Room retrieved successfully", 200, { room });
  });

  updateRoom = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body as UpdateRoomDTO;

    const updatedRoom = await this.updateRoomUseCase.execute(id, updateData);

    ResponseHandler.success(res, "Room updated successfully", 200, { updatedRoom });
  });

  deleteRoom = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    await this.deleteRoomUseCase.execute(id);

    ResponseHandler.success(res, "Room deleted successfully", 200);
  });
}
