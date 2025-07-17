import { LoginDTO } from "../../application/dtos/auth/Login.dto.ts";
import { CreateUserDTO } from "../../application/dtos/auth/CreateUser.dto.ts";
import { UserEntity } from "../entities/User.entity.ts";
import { SafeUser } from "../interfaces/ISafeUser.type.ts";

export interface AuthRepository {
  login(user: LoginDTO): Promise<SafeUser | null>;
  create(user: CreateUserDTO): Promise<SafeUser>;
  findUserById(uid: string): Promise<UserEntity | null>;
  findUserByEmail(email: string): Promise<UserEntity | null>;
}
