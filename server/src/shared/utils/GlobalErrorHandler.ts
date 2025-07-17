import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.ts"; // Import the custom error class

export const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const currentDate = new Date().toLocaleString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const statusCode = err instanceof AppError ? err.statusCode : 500;

  const customError = {
    url: req.originalUrl,
    origin: req.headers["user-agent"] || "Unknown",
    timeStamp: currentDate,
    status: statusCode,
    message: err.message || "Internal Server Error",
  };

  console.error("❌ Error Log:", customError);

  res.status(statusCode).json({
    success: false,
    error: {
      message: customError.message,
      status: customError.status,
    },
  });
};
