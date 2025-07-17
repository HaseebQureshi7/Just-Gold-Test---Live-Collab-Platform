import { Room as IRoom } from "@prisma/client";

export class RoomEntity implements IRoom {
  id: string;
  name: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(room: IRoom) {
    this.id = room.id;
    this.name = room.name;
    this.isPublic = room.isPublic;
    this.createdAt = room.createdAt;
    this.updatedAt = room.updatedAt;
  }
}
