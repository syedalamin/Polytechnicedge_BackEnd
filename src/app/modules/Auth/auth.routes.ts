import { Router } from "express";
import { authController } from "./auth.controller";

import { validateRequest } from "../../middlewares/validateRequest";
import { authValidation } from "./auth.validation";

const router = Router();

router.post(
  "/login",
  validateRequest(authValidation.loginValidation),
  authController.login,
);
router.post("/logout", authController.logout);

export const authRoutes = router;
