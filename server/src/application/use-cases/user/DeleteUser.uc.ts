import { UserEntity } from "../../../domain/entities/User.entity.ts";
import { UserRepository } from "../../../domain/repositories/User.repo.ts";

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(uid: string): Promise<UserEntity> {
    return this.userRepository.delete(uid);
  }
}
