import type { Response } from "express";

interface IApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T | null;
  meta?: Record<string, unknown>;
}

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data?: T | null,
  meta?: Record<string, unknown>
): Response<IApiResponse<T>> => {
  return res.status(statusCode).json({
    success: true,
    statusCode,
    message,
    data: data ?? null,
    ...(meta && { meta }),
  });
};
