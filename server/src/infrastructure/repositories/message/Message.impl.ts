import { PrismaClient } from "@prisma/client";
import { CreateMessageDTO } from "../../../application/dtos/message/CreateMessage.dto.ts";
import { MessageEntity } from "../../../domain/entities/Message.entity.ts";
import { MessageRepository } from "../../../domain/repositories/Message.repo.ts";
import { prisma } from "../../database/client.ts";

export class MessageRepositoryImpl implements MessageRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  // Create a new message
  async create(messageData: CreateMessageDTO): Promise<MessageEntity> {
    const message = await this.prisma.message.create({
      data: {
        userId: messageData.userId,
        roomId: messageData.roomId,
        content: messageData.content,
      },
    });

    return new MessageEntity(message);
  }

  // Find message by ID
  async findById(mid: string): Promise<MessageEntity | null> {
    const message = await this.prisma.message.findUnique({
      where: { id: mid },
    });

    return message ? new MessageEntity(message) : null;
  }

  // Delete message by ID
  async delete(mid: string): Promise<MessageEntity> {
    const deletedMessage = await this.prisma.message.delete({
      where: { id: mid },
    });

    return new MessageEntity(deletedMessage);
  }

  // Get all messages in a room
  async getMessagesByRoom(roomId: string): Promise<MessageEntity[]> {
    const messages = await this.prisma.message.findMany({
      where: { roomId },
      orderBy: { createdAt: "asc" },
    });

    return messages.map((msg) => new MessageEntity(msg));
  }
}
