import type { Response } from "express";
import httpStatus from "http-status";
import { sendErrorResponse } from "../Shared/sendErrorResponse";

export const handleNotFoundError = (res: Response) => {
  sendErrorResponse(res, httpStatus.NOT_FOUND, "Resource not found");
};
