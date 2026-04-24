import jwt, { SignOptions } from "jsonwebtoken";


export interface IJwtPayload {
  userId: string;
  username: string;
  email: string;
  role: string;
}

export const generateToken = (payload: IJwtPayload, secret: string, expiresIn: string): string => {
  return jwt.sign(payload, secret, {
    expiresIn: expiresIn,
  } as SignOptions);
};

export const verifyToken = (token: string, secret: string): IJwtPayload | null => {
  try {
    return jwt.verify(token, secret) as IJwtPayload;
  } catch {
    return null;
  }
};


 