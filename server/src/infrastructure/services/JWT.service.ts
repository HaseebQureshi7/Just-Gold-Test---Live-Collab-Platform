import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET as string;
const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET as string;

export class JwtService {
  static generateAccessToken(userId: string): string {
    return jwt.sign({ userId }, JWT_ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
  }

  static generateRefreshToken(userId: string): string {
    return jwt.sign({ userId }, JWT_REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
  }

  static verifyAccessToken(token: string): { userId: string } | null {
    try {
      return jwt.verify(token, JWT_ACCESS_TOKEN_SECRET) as { userId: string };
    } catch (error) {
      return null;
    }
  }

  static verifyRefreshToken(token: string): { userId: string } | null {
    try {
      return jwt.verify(token, JWT_REFRESH_TOKEN_SECRET) as { userId: string };
    } catch (error) {
      return null;
    }
  }
}
