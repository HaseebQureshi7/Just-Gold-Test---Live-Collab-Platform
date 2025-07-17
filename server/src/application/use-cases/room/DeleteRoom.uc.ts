import { RoomRepository } from "../../../domain/repositories/Room.repo.ts";
import { AppError } from "../../../shared/utils/AppError.ts";

export class DeleteRoomUseCase {
  constructor(private roomRepository: RoomRepository) {}

  async execute(roomId: string): Promise<void> {
    if (!roomId) {
      throw new AppError("Room ID is required.", 400);
    }

    const existingRoom = await this.roomRepository.findById(roomId);
    if (!existingRoom) {
      throw new AppError("Room not found.", 404);
    }

    await this.roomRepository.delete(roomId);
  }
}
