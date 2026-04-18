import { Router } from "express";
import { instructorController } from "./instructor.controller";
import { instructorValidation } from "./instructor.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/create-instructor",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(instructorValidation.createInstructorValidation),
  instructorController.createInstructor,
);


router.put(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(instructorValidation.updateInstructorValidation),
  instructorController.updateInstructorProfile,
);

export const instructorRoutes = router;