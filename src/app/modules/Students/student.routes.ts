import { Router } from "express";
import { studentsController } from "./student.controller";
import { studentsValidation } from "./student.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/create-student",
  validateRequest(studentsValidation.createStudentValidation),
  studentsController.createStudentProfile,
);

router.put(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.STUDENT),
  validateRequest(studentsValidation.updateStudentValidation),
  studentsController.updateStudentProfile,
);

router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  studentsController.deleteStudentProfile,
);

export const studentsRoutes = router;
