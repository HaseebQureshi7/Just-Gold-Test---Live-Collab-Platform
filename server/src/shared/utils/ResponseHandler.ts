import { Response } from "express";

export class ResponseHandler {
  static success(res: Response, message: string, statusCode = 200, data?: any) {
    res.status(statusCode).json({
      status: statusCode,
      message,
      data,
    });
  }
  static error(res: Response, message: string, statusCode = 500, data?: any,) {
    res.status(statusCode).json({
      status: statusCode,
      message,
      data,
    });
  }
}