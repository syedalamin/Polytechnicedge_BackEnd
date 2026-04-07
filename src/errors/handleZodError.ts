import type { Response } from "express";
import httpStatus from "http-status";
import { ZodError } from "zod";
import { sendErrorResponse } from "../Shared/sendErrorResponse";

export const handleZodError = (err: ZodError, res: Response) => {
  const errors = (err as any).issues?.map((e: any) => ({
    path: e.path?.join(".") || "",
    message: e.message,
  }));

  sendErrorResponse(res, httpStatus.BAD_REQUEST, "Validation error", errors);
};
