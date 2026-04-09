import { Router } from "express";
import { adminController } from "./admin.controller";
import { adminValidation } from "./admin.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/create-admin",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(adminValidation.createAdminValidation),
  adminController.createAdmin,
);
router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  adminController.deleteAdmin,
);
router.put(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(adminValidation.updateAdminValidation),
  adminController.updateAdminProfile,
);

export const adminRoutes = router;
