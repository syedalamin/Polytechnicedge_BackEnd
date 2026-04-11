import { Router } from "express";
import { quizController } from "./quiz.controller";
import { quizValidation } from "./quiz.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post("/", auth(UserRole.SUPER_ADMIN, UserRole.ADMIN), validateRequest(quizValidation.createQuizValidation), quizController.createQuiz);
router.get("/", quizController.getAllQuizzes);
router.get("/module/:moduleId", quizController.getQuizzesByModuleId);
router.get("/:id", quizController.getQuizById);
router.patch("/:id", auth(UserRole.SUPER_ADMIN, UserRole.ADMIN), validateRequest(quizValidation.updateQuizValidation), quizController.updateQuiz);
router.delete("/:id", auth(UserRole.SUPER_ADMIN, UserRole.ADMIN), quizController.deleteQuiz);

export const quizRoutes = router;