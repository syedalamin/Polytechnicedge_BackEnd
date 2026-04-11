import { z } from "zod";

const createQuizQuestionValidation = z.object({
  body: z.object({
    quizId: z.string().min(1, { message: "Quiz ID is required" }),
    question: z.string().min(1, { message: "Question is required" }),
    options: z.any(),
    correctAnswer: z.any(),
    marks: z.number().int().positive({ message: "Marks must be a positive integer" }),
    explanation: z.string().optional(),
  }),
});

const updateQuizQuestionValidation = z.object({
  body: z.object({
    question: z.string().min(1).optional(),
    options: z.any().optional(),
    correctAnswer: z.any().optional(),
    marks: z.number().int().positive().optional(),
    explanation: z.string().optional(),
  }),
});

export const quizQuestionValidation = {
  createQuizQuestionValidation,
  updateQuizQuestionValidation,
};