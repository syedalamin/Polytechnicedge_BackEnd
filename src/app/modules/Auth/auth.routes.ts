import { Router } from "express";
import { authController } from "./auth.controller";

import { validateRequest } from "../../middlewares/validateRequest";
import { authValidation } from "./auth.validation";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { studentsValidation } from "../Students/student.validation";

const router = Router();

router.post(
  "/register",
  validateRequest(studentsValidation.createStudentValidation),
  authController.register,
);
router.post(
  "/verify-email-otp",
  validateRequest(authValidation.verifyEmailOtpAndLoginValidation),
  authController.verifyEmailOtpAndLogin,
);
router.post(
  "/resend-otp",
  validateRequest(authValidation.resendOtpValidation),
  authController.resendOtp,
);

router.post(
  "/login",
  validateRequest(authValidation.loginValidation),
  authController.login,
);
router.post("/logout", authController.logout);
router.post("/refresh-token", authController.refreshToken);
router.post(
  "/change-password",
  auth(
    UserRole.ADMIN,
    UserRole.SUPER_ADMIN,
    UserRole.INSTRUCTOR,
    UserRole.STUDENT,
  ),
  validateRequest(authValidation.changePasswordValidation),
  authController.changePassword,
);
router.post(
  "/forget-password",
  validateRequest(authValidation.forgetPasswordValidation),
  authController.forgetPassword,
);
router.post(
  "/reset-password",
  validateRequest(authValidation.resetPasswordValidation),
  authController.resetPassword,
);

export const authRoutes = router;
