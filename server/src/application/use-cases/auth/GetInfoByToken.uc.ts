import { JwtService } from './../../../infrastructure/services/JWT.service.ts';
import { UserEntity } from "../../../domain/entities/User.entity.ts";
import { AuthRepository } from "../../../domain/repositories/Auth.repo.ts";
import { AppError } from '../../../shared/utils/AppError.ts';

interface IGetInfoByToken {
    refreshToken: string;
    accessToken: string;
    user : UserEntity
}

export class GetInfoByTokenUseCase {
  constructor(private userRepository: AuthRepository) {}

  async execute(refreshToken: string): Promise<IGetInfoByToken> {
    const verified = JwtService.verifyRefreshToken(refreshToken)
    if (!verified) {
        throw new AppError("Invalid refresh token", 401)
    }

    const uid = verified.userId
    const user = await this.userRepository.findUserById(uid);
    if (!user) {
        throw new AppError("User with this id was not found!", 404)
    }
    
    const newRefreshToken = JwtService.generateRefreshToken(uid)
    const newAccessToken = JwtService.generateAccessToken(uid)

    return {
        refreshToken: newRefreshToken,
        accessToken: newAccessToken,
        user
    }
  }
}
