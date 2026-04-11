import { Router } from "express";
import { quizAttemptController } from "./quizAttempt.controller";
import { quizAttemptValidation } from "./quizAttempt.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post("/", auth(UserRole.STUDENT), validateRequest(quizAttemptValidation.createQuizAttemptValidation), quizAttemptController.createQuizAttempt);
router.get("/", quizAttemptController.getAllQuizAttempts);
router.get("/quiz/:quizId", quizAttemptController.getQuizAttemptsByQuizId);
router.get("/user/:userId", quizAttemptController.getQuizAttemptsByUserId);
router.get("/:id", quizAttemptController.getQuizAttemptById);
router.patch("/:id", auth(UserRole.SUPER_ADMIN, UserRole.ADMIN), validateRequest(quizAttemptValidation.updateQuizAttemptValidation), quizAttemptController.updateQuizAttempt);
router.delete("/:id", auth(UserRole.SUPER_ADMIN, UserRole.ADMIN), quizAttemptController.deleteQuizAttempt);

export const quizAttemptRoutes = router;