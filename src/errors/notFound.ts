import type { Request, Response, } from "express";
import httpStatus from "http-status";
import { sendErrorResponse } from "../Shared/sendErrorResponse";

export const handleNotFoundError = (req: Request, res: Response,) => {
  sendErrorResponse(res, httpStatus.NOT_FOUND, "Resource not found");
};
