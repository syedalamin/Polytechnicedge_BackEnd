import { Router } from "express";
import { userProgressController } from "./progress.controller";
import { userProgressValidation } from "./progress.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post("/", auth(UserRole.STUDENT), validateRequest(userProgressValidation.createUserProgressValidation), userProgressController.createUserProgress);
router.get("/", userProgressController.getAllUserProgress);
router.get("/user/:userId", userProgressController.getUserProgressByUserId);
router.get("/course/:courseId", userProgressController.getUserProgressByCourseId);
router.get("/user/:userId/course/:courseId", userProgressController.getUserProgressByUserAndCourse);
router.get("/:id", userProgressController.getUserProgressById);
router.patch("/:id", auth(UserRole.STUDENT, UserRole.ADMIN, UserRole.SUPER_ADMIN), validateRequest(userProgressValidation.updateUserProgressValidation), userProgressController.updateUserProgress);
router.delete("/:id", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), userProgressController.deleteUserProgress);

export const userProgressRoutes = router;