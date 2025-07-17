export class AppError extends Error {
    statusCode: number;
  
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
  
      // Ensure the name of the error is the class name
      Object.setPrototypeOf(this, new.target.prototype);
    }
  }
  