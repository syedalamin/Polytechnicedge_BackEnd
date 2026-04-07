import type { Response } from "express";

interface IErrorResponse {
  success: boolean;
  statusCode: number;
  message: string;
  errorDetails?: unknown;
  stack?: string;
}

export const sendErrorResponse = (
  res: Response,
  statusCode: number,
  message: string,
  errorDetails?: unknown,
  stack?: string
): Response<IErrorResponse> => {
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errorDetails,
    stack,
  });
};
