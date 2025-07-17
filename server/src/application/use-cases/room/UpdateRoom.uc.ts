import { RoomRepository } from "../../../domain/repositories/Room.repo.ts";
import { AppError } from "../../../shared/utils/AppError.ts";
import { UpdateRoomDTO } from "../../dtos/room/UpdateRoom.dto.ts";
import { RoomEntity } from "../../../domain/entities/Room.entity.ts";

export class UpdateRoomUseCase {
  constructor(private roomRepository: RoomRepository) {}

  async execute(roomId: string, updatedData: UpdateRoomDTO): Promise<RoomEntity> {
    if (!roomId) {
      throw new AppError("Room ID is required.", 400);
    }
    if (!updatedData || Object.keys(updatedData).length === 0) {
      throw new AppError("At least one field must be updated.", 400);
    }

    const existingRoom = await this.roomRepository.findById(roomId);
    if (!existingRoom) {
      throw new AppError("Room not found.", 404);
    }

    return this.roomRepository.update(roomId, updatedData);
  }
}
