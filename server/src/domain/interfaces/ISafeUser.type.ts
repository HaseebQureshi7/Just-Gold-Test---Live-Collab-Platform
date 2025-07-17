import { UserEntity } from "../entities/User.entity.ts";

export interface SafeUser extends Omit<UserEntity, "password"> {}
