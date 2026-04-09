import { Request, Response, NextFunction } from "express";
 
import httpStatus from "http-status";
import { verifyToken } from "../../lib/generateToken";
import { sendErrorResponse } from "../../Shared/sendErrorResponse";

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
    const token = req.cookies?.token;

    if (!token) {
      sendErrorResponse(
        res,
        httpStatus.UNAUTHORIZED,
        "No token provided",
        null,
      );
    }

    const decoded = verifyToken(token);
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
    }

    req.user = decoded;
    next();
  };
};