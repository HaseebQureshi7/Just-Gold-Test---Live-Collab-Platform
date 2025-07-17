import { UserEntity } from "../../../domain/entities/User.entity.ts";
import { AuthRepository } from "../../../domain/repositories/Auth.repo.ts";

export class GetUserByEmailUseCase {
  constructor(private userRepository: AuthRepository) {}

  async execute(email: string): Promise<UserEntity | null> {
    return this.userRepository.findUserByEmail(email);
  }
}
