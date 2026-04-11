import { Router } from "express";
import { courseInstructorController } from "./courseInstructor.controller";
import { courseInstructorValidation } from "./courseInstructor.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(courseInstructorValidation.createCourseInstructorValidation),
  courseInstructorController.createCourseInstructor,
);

router.get("/", courseInstructorController.getAllCourseInstructors);

router.get("/course/:courseId", courseInstructorController.getCourseInstructorsByCourseId);

router.get("/:id", courseInstructorController.getCourseInstructorById);

router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  courseInstructorController.deleteCourseInstructor,
);

export const courseInstructorRoutes = router;