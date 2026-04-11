import { Router } from "express";
import { enrollmentController } from "./enrollment.controller";
import { enrollmentValidation } from "./enrollment.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post("/", auth(UserRole.STUDENT, UserRole.ADMIN, UserRole.SUPER_ADMIN), validateRequest(enrollmentValidation.createEnrollmentValidation), enrollmentController.createEnrollment);
router.get("/", enrollmentController.getAllEnrollments);
router.get("/user/:userId", enrollmentController.getEnrollmentsByUserId);
router.get("/course/:courseId", enrollmentController.getEnrollmentsByCourseId);
router.get("/:id", enrollmentController.getEnrollmentById);
router.patch("/:id", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), validateRequest(enrollmentValidation.updateEnrollmentValidation), enrollmentController.updateEnrollment);
router.delete("/:id", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), enrollmentController.deleteEnrollment);

export const enrollmentRoutes = router;