import { Router } from "express";
import { authController } from "./auth.controller";

import { validateRequest } from "../../middlewares/validateRequest";
import { authValidation } from "./auth.validation";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

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

export const authRoutes = router;
