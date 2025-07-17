import { UpdateUserDTO } from "../../application/dtos/user/UpdateUser.dto.ts";
import { UserEntity } from "../entities/User.entity.ts";

export interface UserRepository {
  // CRUD
  findById(uid: string): Promise<UserEntity | null>;
  update(updated_data: UpdateUserDTO): Promise<UserEntity>;
  delete(uid: string): Promise<UserEntity>;
}
