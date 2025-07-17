import { CreateCanvasDTOProps } from "./interfaces/ICreateCanvas.type.ts";

export class CreateCanvasDTO {
    public roomId: string;

    constructor(canvasData: CreateCanvasDTOProps) {
        this.roomId = canvasData.roomId;
    }
}
