import prismaClient from "../../../config/prismaClient";
import { generateToken, verifyToken } from "../../../lib/generateToken";
import { ApiError } from "../../../errors/apiError";
import { appConfig } from "../../../config/appConfig";
import { Request } from "express";
import { comparePassword, hashPassword } from "../../../utils/hashPassword";

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}

const login = async (data: ILogin): Promise<ILoginResponse> => {
  const user = await prismaClient.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw ApiError.notFound("User not found");
  }

  const isPasswordValid = await comparePassword(data.password, user.password);
  if (!isPasswordValid) {
    throw ApiError.unauthorized("Invalid password");
  }

  const accessToken = generateToken(
    {
      userId: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    appConfig.jwt.accessSecret as string,
    appConfig.jwt.accessExpiresIn as string,
  );
  const refreshToken = generateToken(
    {
      userId: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    appConfig.jwt.refreshSecret as string,
    appConfig.jwt.refreshExpiresIn as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (refreshToken: string) => {
  const decoded = verifyToken(
    refreshToken,
    appConfig.jwt.refreshSecret as string,
  );
  if (!decoded) {
    throw ApiError.unauthorized("Invalid refresh token");
  }

  const user = await prismaClient.user.findUnique({
    where: { id: decoded.userId },
  });

  if (!user) {
    throw ApiError.unauthorized("Invalid refresh token");
  }

  const payload = {
    userId: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateToken(
    payload,
    appConfig.jwt.accessSecret as string,
    appConfig.jwt.accessExpiresIn as string,
  );

  return accessToken;
};

const changePassword = async (req: Request) => {
  const userId = req.user?.userId;
  if (!userId) {
    throw ApiError.unauthorized("User not authenticated");
  }

  const { oldPassword, newPassword } = req.body;
  const user = await prismaClient.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw ApiError.notFound("User not found");
  }


  const isPasswordValid = await comparePassword(oldPassword, user.password);
  if (!isPasswordValid) {
    throw ApiError.unauthorized("Invalid old password");
  }

  const hashedNewPassword = await hashPassword(newPassword);

  await prismaClient.user.update({
    where: { id: userId },
    data: { password: hashedNewPassword },
  });

  return { message: "Password changed successfully" };
};

export const authService = {
  login,
  refreshToken,
  changePassword,
};
