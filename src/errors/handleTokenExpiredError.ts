import type { Response } from "express";
import httpStatus from "http-status";
import { sendErrorResponse } from "../Shared/sendErrorResponse";

export const handleTokenExpiredError = (res: Response) => {
  sendErrorResponse(
    res,
    httpStatus.BAD_REQUEST,
    "Token has expired",
  );
};
