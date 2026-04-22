import { Router } from "express";
import { userProgressController } from "./progress.controller";
import { userProgressValidation } from "./progress.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/create-progress",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validateRequest(userProgressValidation.createUserProgressValidation),
  userProgressController.createUserProgress,
);
router.patch(
  "/:id",
  auth(UserRole.STUDENT, UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validateRequest(userProgressValidation.updateUserProgressValidation),
  userProgressController.updateUserProgress,
);
router.delete(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  userProgressController.deleteUserProgress,
);

router.post(
  "/mark-complete",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(userProgressValidation.markCourseCompleteValidation),
  userProgressController.markCourseComplete,
);

export const userProgressRoutes = router;
