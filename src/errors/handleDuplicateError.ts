import type { Response } from "express";
import httpStatus from "http-status";
import { sendErrorResponse } from "../Shared/sendErrorResponse";

export const handleDuplicateError = (res: Response) => {
  sendErrorResponse(
    res,
    httpStatus.BAD_REQUEST,
    "Duplicate entry: This record already exists",
  );
};
