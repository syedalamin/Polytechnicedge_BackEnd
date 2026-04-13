import { Router } from "express";
import { courseBundleController } from "./bundle.controller";
import { courseBundleValidation } from "./bundle.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/create-bundle",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validateRequest(courseBundleValidation.createCourseBundleValidation),
  courseBundleController.createCourseBundle,
);
router.put(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validateRequest(courseBundleValidation.updateCourseBundleValidation),
  courseBundleController.updateCourseBundle,
);
router.delete(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  courseBundleController.deleteCourseBundle,
);

export const bundleRoutes = router;
