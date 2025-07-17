import { Request, Response } from "express";
import { MessageRepository } from "../../../domain/repositories/Message.repo.ts";
import { CreateMessageUseCase } from "../../../application/use-cases/message/CreateMessage.uc.ts";
import { FindMessageUseCase } from "../../../application/use-cases/message/FindMessage.uc.ts";
import { DeleteMessageUseCase } from "../../../application/use-cases/message/DeleteMessage.uc.ts";
import { GetMessagesByRoomUseCase } from "../../../application/use-cases/message/GetAllMessagesByRoom.uc.ts";
import { ResponseHandler } from "../../../shared/utils/ResponseHandler.ts";
import { catchAsync } from "../../../shared/utils/CatchAsync.ts";
import { CreateMessageDTO } from "../../../application/dtos/message/CreateMessage.dto.ts";

export class MessageController {
  private createMessageUseCase: CreateMessageUseCase;
  private findMessageUseCase: FindMessageUseCase;
  private deleteMessageUseCase: DeleteMessageUseCase;
  private getMessagesByRoomUseCase: GetMessagesByRoomUseCase;

  constructor(messageRepo: MessageRepository) {
    this.createMessageUseCase = new CreateMessageUseCase(messageRepo);
    this.findMessageUseCase = new FindMessageUseCase(messageRepo);
    this.deleteMessageUseCase = new DeleteMessageUseCase(messageRepo);
    this.getMessagesByRoomUseCase = new GetMessagesByRoomUseCase(messageRepo);
  }

  // Create a new message
  create = catchAsync(async (req: Request, res: Response) => {
    const { userId, roomId, content } = req.body;

    const createDTO = new CreateMessageDTO({
      userId,
      roomId,
      content,
    });

    const message = await this.createMessageUseCase.execute(createDTO);

    ResponseHandler.success(res, "Message created successfully", 201, message);
  });

  // Find message by ID
  findById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const message = await this.findMessageUseCase.execute(id);

    if (!message) {
      return ResponseHandler.error(res, "Message not found", 404);
    }

    ResponseHandler.success(res, "Message retrieved successfully", 200, message);
  });

  // Delete message by ID
  delete = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const deletedMessage = await this.deleteMessageUseCase.execute(id);

    ResponseHandler.success(res, "Message deleted successfully", 200, deletedMessage);
  });

  // Get all messages by Room ID
  getMessagesByRoom = catchAsync(async (req: Request, res: Response) => {
    const { roomId } = req.params;

    const messages = await this.getMessagesByRoomUseCase.execute(roomId);

    ResponseHandler.success(res, "Messages retrieved successfully", 200, messages);
  });
}


