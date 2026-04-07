import httpStatus from "http-status";

export class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(statusCode: number, message: string, stack = "") {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  static badRequest(message: string) {
    return new ApiError(httpStatus.BAD_REQUEST, message);
  }

  static unauthorized(message: string = "Unauthorized") {
    return new ApiError(httpStatus.UNAUTHORIZED, message);
  }

  static notFound(message: string = "Resource not found") {
    return new ApiError(httpStatus.NOT_FOUND, message);
  }

  static internal(message: string = "Internal server error") {
    return new ApiError(httpStatus.INTERNAL_SERVER_ERROR, message);
  }
}
