import { sendResponse } from "../../../Shared/sendResponse";
import httpStatus from "http-status";
import { authService } from "./auth.service";
import catchAsync from "../../../Shared/catchAsync";
import { ApiError } from "../../../errors/apiError";
import { appConfig } from "../../../config/appConfig";

const login = catchAsync(async (req, res) => {
  const accessExpiresInMs = Number(appConfig.jwt.accessExpiresInMs);
  const refreshExpiresInMs = Number(appConfig.jwt.refreshExpiresInMs);

  if (Number.isNaN(accessExpiresInMs) || Number.isNaN(refreshExpiresInMs)) {
    throw new Error("Invalid JWT expiration configuration");
  }

  const result = await authService.login(req.body);

  res.cookie("accessToken", result.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: accessExpiresInMs,
  });

  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: refreshExpiresInMs,
  });

  sendResponse(res, httpStatus.OK, "Login successful", null);
});

const logout = catchAsync(async (_req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  sendResponse(res, httpStatus.OK, "Logout successful", null);
});

const refreshToken = catchAsync(async (req, res) => {
  const accessExpiresInMs = Number(appConfig.jwt.accessExpiresInMs);
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) {
    throw ApiError.unauthorized("Refresh token not found");
  }

  const accessToken = await authService.refreshToken(refreshToken);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: accessExpiresInMs,
  });

  sendResponse(res, httpStatus.OK, "Token refreshed successfully", null);
});

const changePassword = catchAsync(async (req, res) => {
  const result = await authService.changePassword(req);
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  sendResponse(res, httpStatus.OK, result.message, null);
});

export const authController = {
  login,
  logout,
  refreshToken,
  changePassword,
};
