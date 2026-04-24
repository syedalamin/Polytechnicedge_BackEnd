import { Request, Response, NextFunction } from "express";

import httpStatus from "http-status";
import { verifyToken } from "../../lib/generateToken";
import { sendErrorResponse } from "../../Shared/sendErrorResponse";
import { appConfig } from "../../config/appConfig";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    username: string;
    email: string;
    role: string;
  };
}

export const auth = (...allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies?.accessToken;

    if (!token) {
      sendErrorResponse(
        res,
        httpStatus.UNAUTHORIZED,
        "You are now authorized to access this resource, please login",
        null,
      );
    }

    const decoded = verifyToken(token, appConfig.jwt.accessSecret as string);
    if (!decoded) {
      sendErrorResponse(res, httpStatus.UNAUTHORIZED, "Invalid token", null);
      return;
    }

    const userRole = decoded.role;
    if (!allowedRoles.includes(userRole)) {
      sendErrorResponse(
        res,
        httpStatus.FORBIDDEN,
        "You do not have permission to access this resource",
        null,
      );
    } else {
      req.user = decoded;
      next();
    }
  };
};
