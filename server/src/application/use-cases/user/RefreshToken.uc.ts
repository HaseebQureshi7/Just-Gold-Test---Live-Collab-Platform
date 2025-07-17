import { JwtService } from "../../../infrastructure/services/JWT.service.ts";

export class RefreshTokenUseCase {
  async execute(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    const decoded = JwtService.verifyRefreshToken(refreshToken);

    if (!decoded) {
      throw new Error("Unauthorized: Invalid refresh token");
    }

    const newAccessToken = JwtService.generateAccessToken(decoded.userId);
    const newRefreshToken = JwtService.generateRefreshToken(decoded.userId);

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }
}
