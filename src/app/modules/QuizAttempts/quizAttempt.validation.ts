import { z } from "zod";

const createQuizAttemptValidation = z.object({
  body: z.object({
    userId: z.string().min(1, { message: "User ID is required" }),
    quizId: z.string().min(1, { message: "Quiz ID is required" }),
    score: z.number().int().min(0, { message: "Score must be a non-negative integer" }),
    isPassed: z.boolean(),
    answers: z.any(),
  }),
});

const updateQuizAttemptValidation = z.object({
  body: z.object({
    score: z.number().int().min(0).optional(),
    isPassed: z.boolean().optional(),
    answers: z.any().optional(),
  }),
});

export const quizAttemptValidation = {
  createQuizAttemptValidation,
  updateQuizAttemptValidation,
};