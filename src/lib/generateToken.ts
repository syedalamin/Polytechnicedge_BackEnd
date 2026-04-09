import jwt, { SignOptions } from "jsonwebtoken";
import { appConfig } from "../config/appConfig";

export interface IJwtPayload {
  userId: string;
  username: string;
  email: string;
  role: string;
}

export const generateToken = (payload: IJwtPayload): string => {
  return jwt.sign(payload, appConfig.jwt.secret, {
    expiresIn: appConfig.jwt.expiresIn,
  } as SignOptions);
};

export const verifyToken = (token: string): IJwtPayload | null => {
  try {
    return jwt.verify(token, appConfig.jwt.secret) as IJwtPayload;
  } catch {
    return null;
  }
};