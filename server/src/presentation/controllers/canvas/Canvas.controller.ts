import { Request, Response } from "express";
import { CanvasRepository } from "../../../domain/repositories/Canvas.repo.ts";
import { CreateCanvasUseCase } from "../../../application/use-cases/canvas/CreateCanvas.uc.ts";
import { FindCanvasByRoomIdUseCase } from "../../../application/use-cases/canvas/FindCanvasByRoomId.uc.ts";
import { FindCanvasByIdUseCase } from "../../../application/use-cases/canvas/FindCanvasById.uc.ts";
import { UpdateCanvasUseCase } from "../../../application/use-cases/canvas/UpdateCanvas.uc.ts";
import { DeleteCanvasUseCase } from "../../../application/use-cases/canvas/DeleteCanvas.uc.ts";
import { ResponseHandler } from "../../../shared/utils/ResponseHandler.ts";
import { catchAsync } from "../../../shared/utils/CatchAsync.ts";
import { CreateCanvasDTO } from "../../../application/dtos/canvas/CreateCanvas.dto.ts";
import { UpdateCanvasDTO } from "../../../application/dtos/canvas/UpdateCanvas.dto.ts";

export class CanvasController {
  private createCanvasUseCase: CreateCanvasUseCase;
  private findCanvasByRoomIdUseCase: FindCanvasByRoomIdUseCase;
  private findCanvasByIdUseCase: FindCanvasByIdUseCase;
  private updateCanvasUseCase: UpdateCanvasUseCase;
  private deleteCanvasUseCase: DeleteCanvasUseCase;

  constructor(canvasRepo: CanvasRepository) {
    this.createCanvasUseCase = new CreateCanvasUseCase(canvasRepo);
    this.findCanvasByRoomIdUseCase = new FindCanvasByRoomIdUseCase(canvasRepo);
    this.findCanvasByIdUseCase = new FindCanvasByIdUseCase(canvasRepo);
    this.updateCanvasUseCase = new UpdateCanvasUseCase(canvasRepo);
    this.deleteCanvasUseCase = new DeleteCanvasUseCase(canvasRepo);
  }

  // Create a new canvas
  create = catchAsync(async (req: Request, res: Response) => {
    const { roomId, data } = req.body;

    const createDTO = new CreateCanvasDTO({ roomId, data });

    const canvas = await this.createCanvasUseCase.execute(createDTO);

    ResponseHandler.success(res, "Canvas created successfully", 201, canvas);
  });

  // Find canvas by Room ID
  findByRoomId = catchAsync(async (req: Request, res: Response) => {
    const { roomId } = req.params;

    const canvas = await this.findCanvasByRoomIdUseCase.execute(roomId);

    if (!canvas) {
      return ResponseHandler.error(res, "Canvas not found for this room", 404);
    }

    ResponseHandler.success(res, "Canvas retrieved successfully", 200, canvas);
  });

  // Find canvas by ID
  findById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const canvas = await this.findCanvasByIdUseCase.execute(id);

    if (!canvas) {
      return ResponseHandler.error(res, "Canvas not found", 404);
    }

    ResponseHandler.success(res, "Canvas retrieved successfully", 200, canvas);
  });

  // Update canvas by Room ID
  update = catchAsync(async (req: Request, res: Response) => {
    const { id:cid } = req.params
    const { data } = req.body;

    const updateDTO = new UpdateCanvasDTO({ data });

    const updatedCanvas = await this.updateCanvasUseCase.execute(
      cid,
      updateDTO
    );

    ResponseHandler.success(
      res,
      "Canvas updated successfully",
      200,
      updatedCanvas
    );
  });

  // Delete canvas by ID
  delete = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const deletedCanvas = await this.deleteCanvasUseCase.execute(id);

    ResponseHandler.success(
      res,
      "Canvas deleted successfully",
      200,
      deletedCanvas
    );
  });
}
