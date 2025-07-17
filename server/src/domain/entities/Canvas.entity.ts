import { Canvas as ICanvas } from "@prisma/client";

export class CanvasEntity implements ICanvas {
  id: string;
  roomId: string;
  data: any;
  updatedAt: Date;

  constructor(canvas: ICanvas) {
    this.id = canvas.id;
    this.roomId = canvas.roomId;
    this.data = canvas.data;
    this.updatedAt = canvas.updatedAt;
  }
}
