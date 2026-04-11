import { Router } from "express";
import { quizQuestionController } from "./quizQuestion.controller";
import { quizQuestionValidation } from "./quizQuestion.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post("/", auth(UserRole.SUPER_ADMIN, UserRole.ADMIN), validateRequest(quizQuestionValidation.createQuizQuestionValidation), quizQuestionController.createQuizQuestion);
router.get("/", quizQuestionController.getAllQuizQuestions);
router.get("/quiz/:quizId", quizQuestionController.getQuizQuestionsByQuizId);
router.get("/:id", quizQuestionController.getQuizQuestionById);
router.patch("/:id", auth(UserRole.SUPER_ADMIN, UserRole.ADMIN), validateRequest(quizQuestionValidation.updateQuizQuestionValidation), quizQuestionController.updateQuizQuestion);
router.delete("/:id", auth(UserRole.SUPER_ADMIN, UserRole.ADMIN), quizQuestionController.deleteQuizQuestion);

export const quizQuestionRoutes = router;