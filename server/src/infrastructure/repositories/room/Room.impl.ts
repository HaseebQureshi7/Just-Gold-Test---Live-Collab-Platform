import { PrismaClient } from "@prisma/client";
import { CreateRoomDTO } from "../../../application/dtos/room/CreateRoom.dto.ts";
import { UpdateRoomDTO } from "../../../application/dtos/room/UpdateRoom.dto.ts";
import { RoomEntity } from "../../../domain/entities/Room.entity.ts";
import { RoomRepository } from "../../../domain/repositories/Room.repo.ts";
import { prisma as dbClient } from "../../database/client.ts";

export class RoomRepositoryImpl implements RoomRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = dbClient;
  }

  async create(room_data: CreateRoomDTO): Promise<RoomEntity> {
    const room = await this.prisma.room.create({
      data: room_data,
    });

    return new RoomEntity(room);
  }
  async findById(rid: string): Promise<RoomEntity | null> {
    const room = await this.prisma.room.findUnique({
      where: {
        id: rid,
      },
    });

    return room ? new RoomEntity(room) : null;
  }
  async update(rid: string, updated_data: UpdateRoomDTO): Promise<RoomEntity> {
    const updatedRoom = await this.prisma.room.update({
      where: {
        id: rid,
      },
      data: updated_data,
    });

    return new RoomEntity(updatedRoom);
  }
  async delete(rid: string): Promise<RoomEntity> {
    const deletedRoom = await this.prisma.room.delete({
      where: {
        id: rid,
      },
    });
    return new RoomEntity(deletedRoom);
  }
}
