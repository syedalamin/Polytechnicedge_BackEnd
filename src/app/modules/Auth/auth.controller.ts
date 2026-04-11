import { sendResponse } from "../../../Shared/sendResponse";
import httpStatus from "http-status";
import { authService } from "./auth.service";
import catchAsync from "../../../Shared/catchAsync";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const login = catchAsync(async (req, res) => {
  const result = await authService.login(req.body);

  res.cookie("token", result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  sendResponse(res, httpStatus.OK, "Login successful", null);
});

const logout = catchAsync(async (_req, res) => {
  res.clearCookie("token");
  sendResponse(res, httpStatus.OK, "Logout successful", null);
});

export const authController = {
  login,
  logout,
};
