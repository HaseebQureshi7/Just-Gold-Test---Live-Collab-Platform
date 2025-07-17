import { Message as IMessage } from "@prisma/client";

export class MessageEntity implements IMessage {
  id: string;
  userId: string;
  roomId: string;
  content: string;
  createdAt: Date;

  constructor(message: IMessage) {
    this.id = message.id;
    this.userId = message.userId;
    this.roomId = message.roomId;
    this.content = message.content;
    this.createdAt = message.createdAt;
  }
}