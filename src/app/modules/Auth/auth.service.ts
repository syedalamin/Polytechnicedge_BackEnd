import prismaClient from "../../../config/prismaClient";
import { generateToken, verifyToken } from "../../../lib/generateToken";
import { ApiError } from "../../../errors/apiError";
import { appConfig } from "../../../config/appConfig";
import { Request } from "express";
import { comparePassword, hashPassword } from "../../../utils/hashPassword";
import { sendEmail } from "../../../utils/sendEmail";
import status from "http-status";

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

  return accessToken;
};

const forgetPassword = async (email: string): Promise<string> => {
  const user = await prismaClient.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new ApiError( status.NOT_FOUND, "User not found");
  }

  const resetToken = generateToken(
    {
      userId: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    appConfig.jwt.resetSecret as string,
    appConfig.jwt.resetExpiresIn as string,
  );

  const resetUrl = `${appConfig.frontendUrl}/reset-password?token=${resetToken}`;
  const html = `
    <h1>Password Reset Request</h1>
    <p>Hi ${user.username},</p>
    <p>You requested to reset your password. Click the link below to reset it:</p>
    <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
    <p>This link will expire in 5 minutes.</p>
    <p>If you didn't request this, please ignore this email.</p>
  `;
  await sendEmail(email, "Password Reset Request", html);
  
  return resetToken;
};

const resetPassword = async (
  token: string,
  newPassword: string,
): Promise<void> => {
  const decoded = verifyToken(token, appConfig.jwt.resetSecret as string);

  if (!decoded || !decoded.userId) {
     throw new ApiError(status.BAD_REQUEST, "Invalid or expired reset token");
  }

  const user = await prismaClient.user.findUnique({
    where: { id: decoded.userId },
  });

  if (!user) {
    throw new ApiError(status.NOT_FOUND, "User not found");
  }

  const hashedNewPassword = await hashPassword(newPassword);

  await prismaClient.user.update({
    where: { id: user.id },
    data: { password: hashedNewPassword },
  });
};

export const authService = {
  login,
  refreshToken,
  changePassword,
  forgetPassword,
  resetPassword,
};
