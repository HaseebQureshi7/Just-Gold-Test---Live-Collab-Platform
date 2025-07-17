import { UpdateRoomDTOProps } from "./interfaces/IUpdateRoom.type.ts";

export class UpdateRoomDTO {
    public id: string;
    public name?: string;
    public isPublic?: boolean;

    constructor(roomData: UpdateRoomDTOProps) {
        this.id = roomData.id;
        this.name = roomData.name;
        this.isPublic = roomData.isPublic;
    }
}
