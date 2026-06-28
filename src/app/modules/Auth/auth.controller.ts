import { sendResponse } from "../../../Shared/sendResponse";
import httpStatus from "http-status";
import { authService } from "./auth.service";
import catchAsync from "../../../Shared/catchAsync";
import { ApiError } from "../../../errors/apiError";
import { appConfig } from "../../../config/appConfig";

const register = catchAsync(async (req, res) => {
  const result = await authService.register(req.body);
  sendResponse(res, httpStatus.OK, result.message, result);
});

const verifyEmailOtpAndLogin = catchAsync(async (req, res) => {
  const accessExpiresInMs = Number(appConfig.jwt.accessExpiresInMs);
  const refreshExpiresInMs = Number(appConfig.jwt.refreshExpiresInMs);

  if (Number.isNaN(accessExpiresInMs) || Number.isNaN(refreshExpiresInMs)) {
    throw new Error("Invalid JWT expiration configuration");
  }

  const { email, otp } = req.body;
  const result = await authService.verifyEmailOtpAndLogin(email, otp);

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

const resendOtp = catchAsync(async (req, res) => {
  const { email } = req.body;
  const result = await authService.resendOtp(email);
  sendResponse(res, httpStatus.OK, "OTP resent successfully.", result);
});

const login = catchAsync(async (req, res) => {
  const accessExpiresInMs = Number(appConfig.jwt.accessExpiresInMs);
  const refreshExpiresInMs = Number(appConfig.jwt.refreshExpiresInMs);

  if (Number.isNaN(accessExpiresInMs) || Number.isNaN(refreshExpiresInMs)) {
    throw new Error("Invalid JWT expiration configuration");
  }

  const result = await authService.login(req.body);

  if ("resendOtp" in result && result.resendOtp) {
    sendResponse(res, httpStatus.OK, result.message, {
      resendOtp: true,
      email: result.email,
    });
  } else if ("accessToken" in result && "refreshToken" in result && "loginData" in result) {
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

    res.cookie("loginData", result.loginData, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: accessExpiresInMs,
    });

    sendResponse(res, httpStatus.OK, "Login successful", null);
  } 
});

const logout = catchAsync(async (_req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.clearCookie("loginData");
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
  const accessExpiresInMs = Number(appConfig.jwt.accessExpiresInMs);
  const accessToken = await authService.changePassword(req);
  res.clearCookie("accessToken");
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: accessExpiresInMs,
  });
  sendResponse(res, httpStatus.OK, "Password changed successfully");
});

const forgetPassword = catchAsync(async (req, res) => {
  const resetToken = await authService.forgetPassword(req.body.email);
  sendResponse(res, httpStatus.OK, "Password reset link sent to your email", {
    resetToken,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const { token, newPassword } = req.body;
  await authService.resetPassword(token, newPassword);
  sendResponse(res, httpStatus.OK, "Password reset successful");
});

export const authController = {
  register,
  verifyEmailOtpAndLogin,
  resendOtp,
  login,
  logout,
  refreshToken,
  changePassword,
  forgetPassword,
  resetPassword,
};
