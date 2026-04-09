import { Request, Response, NextFunction } from "express";
 
import { sendResponse } from "../../Shared/sendResponse";
import httpStatus from "http-status";
import { verifyToken } from "../../lib/generateToken";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: string;
  };
}

export const auth = (...allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;

    if (!token) {
      return sendResponse(
        res,
        httpStatus.UNAUTHORIZED,
        "No token provided",
        null,
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return sendResponse(res, httpStatus.UNAUTHORIZED, "Invalid token", null);
    }

    const userRole = decoded.role;
    if (!allowedRoles.includes(userRole)) {
      return sendResponse(
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