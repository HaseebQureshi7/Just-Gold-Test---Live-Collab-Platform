import { RoomRepository } from "../../../domain/repositories/Room.repo.ts";
import { AppError } from "../../../shared/utils/AppError.ts";
import { RoomEntity } from "../../../domain/entities/Room.entity.ts";

export class FindRoomByIdUseCase {
  constructor(private roomRepository: RoomRepository) {}

  async execute(roomId: string): Promise<RoomEntity> {
    if (!roomId) {
      throw new AppError("Room ID is required.", 400);
    }

    const room = await this.roomRepository.findById(roomId);
    if (!room) {
      throw new AppError("Room not found.", 404);
    }

    return room;
  }
}
