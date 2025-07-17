import { UpdateCanvasDTO } from "../../application/dtos/canvas/UpdateCanvas.dto.ts";
import { CreateCanvasDTO } from "../../application/dtos/canvas/CreateCanvas.dto.ts";
import { CanvasEntity } from "../entities/Canvas.entity.ts";

export interface CanvasRepository {
  findByRoomId(roomId: string): Promise<CanvasEntity | null>;
  findById(cid: string): Promise<CanvasEntity | null>;
  update(cid:string, updated_data: UpdateCanvasDTO): Promise<CanvasEntity>;
  create(data: CreateCanvasDTO): Promise<CanvasEntity>;
  delete(cid: string): Promise<CanvasEntity>;
}
