import { Request, Response, NextFunction } from "express";
import { sendErrorResponse } from "../../Shared/sendErrorResponse";
import { handleZodError } from "../../errors/handleZodError";
import { handleDuplicateError } from "../../errors/handleDuplicateError";
import { handleTokenExpiredError } from "../../errors/handleTokenExpiredError";

const isProduction = process.env.NODE_ENV === "production";

export const globalErrorHandler = (
  err: Record<string, unknown>,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let message = err?.message || "Internal server error";
  let statusCode = (err?.statusCode as number) || 500;
  let stack = err?.stack as string | undefined;

  if (err?.code === "P2002") {
    handleDuplicateError(res);
  } else if (err?.name === "TokenExpiredError") {
    handleTokenExpiredError(res);
  } else if (err?.name === "ZodError") {
    handleZodError(err as any, res);
  } else if (res.headersSent) {
    return res.end();
  } else {
    sendErrorResponse(
      res,
      statusCode,
      message as string,
      undefined,
      isProduction ? undefined : stack,
    );
  }
};
