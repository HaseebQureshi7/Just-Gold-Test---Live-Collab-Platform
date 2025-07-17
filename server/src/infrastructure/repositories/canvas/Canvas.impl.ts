import { PrismaClient } from "@prisma/client";
import { CanvasRepository } from "../../../domain/repositories/Canvas.repo.ts";
import { CreateCanvasDTO } from "../../../application/dtos/canvas/CreateCanvas.dto.ts";
import { UpdateCanvasDTO } from "../../../application/dtos/canvas/UpdateCanvas.dto.ts";
import { CanvasEntity } from "../../../domain/entities/Canvas.entity.ts";
import { prisma } from "../../database/client.ts"; // Prisma Client

export class CanvasRepositoryImpl implements CanvasRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async findByRoomId(roomId: string): Promise<CanvasEntity | null> {
    const canvas = await this.prisma.canvas.findUnique({
      where: { roomId },
    });
    return canvas ? new CanvasEntity(canvas) : null;
  }

  async findById(cid: string): Promise<CanvasEntity | null> {
    const canvas = await this.prisma.canvas.findUnique({
      where: { id: cid },
    });
    return canvas ? new CanvasEntity(canvas) : null;
  }

  async update(cid:string, updated_data: UpdateCanvasDTO): Promise<CanvasEntity> {
    const updatedCanvas = await this.prisma.canvas.update({
      where: { id: cid },
      data: {
        data: updated_data.data,
      },
    });
    return new CanvasEntity(updatedCanvas);
  }

  async create(data: CreateCanvasDTO): Promise<CanvasEntity> {
    const newCanvas = await this.prisma.canvas.create({
      data: {
        roomId: data.roomId
      },
    });
    return new CanvasEntity(newCanvas);
  }

  async delete(cid: string): Promise<CanvasEntity> {
    const deletedCanvas = await this.prisma.canvas.delete({
      where: { id: cid },
    });
    return new CanvasEntity(deletedCanvas);
  }
}
