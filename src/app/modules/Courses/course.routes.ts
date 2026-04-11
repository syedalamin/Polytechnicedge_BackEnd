import { Router } from "express";
import { courseController } from "./course.controller";
import { courseValidation } from "./course.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/create-course",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(courseValidation.createCourseValidation),
  courseController.createCourse,
);

router.patch(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(courseValidation.updateCourseValidation),
  courseController.updateCourse,
);

router.patch(
  "/:id/publish",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  courseController.publishCourse,
);

router.patch(
  "/:id/unpublish",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  courseController.unpublishCourse,
);

router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  courseController.deleteCourse,
);



export const courseRoutes = router;