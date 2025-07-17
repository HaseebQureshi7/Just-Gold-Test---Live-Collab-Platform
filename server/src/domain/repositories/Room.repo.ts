import { CreateRoomDTO } from "../../application/dtos/room/CreateRoom.dto.ts";
import { UpdateRoomDTO } from "../../application/dtos/room/UpdateRoom.dto.ts";
import { RoomEntity } from "../entities/Room.entity.ts";

export interface RoomRepository {
  create(room_data: CreateRoomDTO): Promise<RoomEntity>;
  findById(rid: string): Promise<RoomEntity | null>;
  update(rid: string, updated_data: UpdateRoomDTO): Promise<RoomEntity>;
  delete(rid: string): Promise<RoomEntity>;
}
