import { CanvasRepository } from "../../../domain/repositories/Canvas.repo.ts";
import { CreateCanvasDTO } from "../../dtos/canvas/CreateCanvas.dto.ts";
import { CanvasEntity } from "../../../domain/entities/Canvas.entity.ts";
import { AppError } from "../../../shared/utils/AppError.ts";

export class CreateCanvasUseCase {
  private canvasRepository: CanvasRepository;

  constructor(canvasRepository: CanvasRepository) {
    this.canvasRepository = canvasRepository;
  }

  async execute(canvasData: CreateCanvasDTO): Promise<CanvasEntity> {
    if (!canvasData.roomId) {
      throw new AppError("Required fields missing: roomId", 400)
    }
    const existingCanvas = await this.canvasRepository.findByRoomId(canvasData.roomId);
    
    if (existingCanvas) {
      throw new AppError("A canvas already exists for this room.", 400);
    }

    const newCanvas = await this.canvasRepository.create(canvasData);

    return newCanvas;
  }
}
