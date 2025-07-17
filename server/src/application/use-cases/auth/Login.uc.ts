import { AuthRepository } from "../../../domain/repositories/Auth.repo.ts";
import { JwtService } from "../../../infrastructure/services/JWT.service.ts";
import { AppError } from "../../../shared/utils/AppError.ts";
import { LoginDTO } from "../../dtos/auth/Login.dto.ts";

export class LoginUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(loginData: LoginDTO) {
    // Check if email and password are provided
    if (!loginData?.email || !loginData?.password) {
      throw new AppError("Email and password are required.", 400);
    }

    // Call the repository for authentication
    const user = await this.authRepository.login(loginData);

    if (!user) {
      throw new AppError("Invalid email or password.", 401);
    }

    const accessToken = JwtService.generateAccessToken(user.id)
    const refreshToken = JwtService.generateRefreshToken(user.id)

    return {user, accessToken, refreshToken};
  }
}
