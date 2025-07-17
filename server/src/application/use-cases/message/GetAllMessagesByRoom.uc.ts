import { MessageRepository } from "../../../domain/repositories/Message.repo.ts";
import { MessageEntity } from "../../../domain/entities/Message.entity.ts";
import { AppError } from "../../../shared/utils/AppError.ts";

export class GetMessagesByRoomUseCase {
  constructor(private messageRepository: MessageRepository) {}

  async execute(roomId: string): Promise<MessageEntity[]> {
    if (!roomId) {
      throw new AppError("Room ID is required.", 400);
    }

    const messages = await this.messageRepository.getMessagesByRoom(roomId);
    
    if (messages.length === 0) {
      throw new AppError("No messages found for this room.", 404);
    }

    return messages;
  }
}
