import { NextFunction, Request, Response } from "express";
import { JwtService } from "../../infrastructure/services/JWT.service.ts";

// Extend Express Request type to include `userId`
declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
  }
}

export const AuthenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // Extract Bearer Token from Cookie or Headers
  const userToken =
    req.cookies["accessToken"] || req.headers.authorization?.split(" ")[1];
  if (!userToken) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
    return;
  }

  try {
    const isTokenValid = JwtService.verifyAccessToken(userToken);
    if (!isTokenValid) {
      res.status(401).json({ message: "Invalid Token!" });
      return;
    }

    req.userId = isTokenValid.userId; // Attach userId to request
    next(); // Only proceed if token is valid
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
