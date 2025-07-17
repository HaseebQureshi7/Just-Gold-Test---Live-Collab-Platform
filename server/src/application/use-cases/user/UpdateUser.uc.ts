import { UpdateUserDTO } from "../../dtos/user/UpdateUser.dto.ts";
import { UserEntity } from "../../../domain/entities/User.entity.ts";
import { UserRepository } from "../../../domain/repositories/User.repo.ts";

export class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(updatedData: UpdateUserDTO): Promise<UserEntity> {
    return this.userRepository.update(updatedData);
  }
}
