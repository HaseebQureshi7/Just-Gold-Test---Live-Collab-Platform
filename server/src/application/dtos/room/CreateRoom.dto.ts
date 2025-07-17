import { CreateRoomDTOProps } from "./interfaces/ICreateRoom.type.ts";

export class CreateRoomDTO {
    public name: string;
    public isPublic: boolean;

    constructor(roomData: CreateRoomDTOProps) {
        this.name = roomData.name;
        this.isPublic = roomData.isPublic;
    }
}
