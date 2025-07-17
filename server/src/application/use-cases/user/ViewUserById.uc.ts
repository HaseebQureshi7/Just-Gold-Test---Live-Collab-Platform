import { UserEntity } from "../../../domain/entities/User.entity.ts";
import { AuthRepository } from "../../../domain/repositories/Auth.repo.ts";
import { UserRepository } from "../../../domain/repositories/User.repo.ts";
import { AppError } from "../../../shared/utils/AppError.ts";

export class ViewUserByIdUseCase {
  constructor(private userRepository: AuthRepository) {}

  async execute(uid: string): Promise<UserEntity | null> {
    if (!uid) {
      throw new AppError("No uid provided!", 400);
    }
    const userFound = await this.userRepository.findUserById(uid);
    if (!userFound) {
      throw new AppError("No user found with this id", 404);
    }

    return userFound;
  }
}
