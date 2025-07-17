import { UserEntity } from "../../../domain/entities/User.entity.ts";
import { AuthRepository } from "../../../domain/repositories/Auth.repo.ts";

export class GetUserByIdUseCase {
  constructor(private userRepository: AuthRepository) {}

  async execute(uid: string): Promise<UserEntity | null> {
    return this.userRepository.findUserById(uid);
  }
}
