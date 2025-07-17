import { CreateMessageDTO } from "../../application/dtos/message/CreateMessage.dto.ts";
import { MessageEntity } from "../entities/Message.entity.ts";

export interface MessageRepository {
  create(message_data: CreateMessageDTO): Promise<MessageEntity>;
  findById(mid: string): Promise<MessageEntity | null>;
  delete(mid: string): Promise<MessageEntity>;
  getMessagesByRoom(rid: string): Promise<MessageEntity[]>;
}
