import { UpdateCanvasDTOProps } from "./interfaces/IUpdateCanvas.type.ts";

export class UpdateCanvasDTO {
    public data: object;

    constructor(canvasData: UpdateCanvasDTOProps) {
        this.data = canvasData.data;
    }
}
