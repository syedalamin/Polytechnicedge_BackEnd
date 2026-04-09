import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";
import httpStatus from "http-status";
import { sendErrorResponse } from "../../Shared/sendErrorResponse";

export const validateRequest = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    
    try {
      const parsed = schema.parse({
        body: req.body,
      }) as { body: unknown };

      req.body = parsed.body;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        }));
        sendErrorResponse(
          res,
          httpStatus.BAD_REQUEST,
          "Validation failed",
          errors,
        );
      } else {
        next(error);
      }
    }
  };
};
