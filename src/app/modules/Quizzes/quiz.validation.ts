import { z } from "zod";

const createQuizValidation = z.object({
  body: z.object({
    moduleId: z.string().min(1, { message: "Module ID is required" }),
    title: z.string().min(1, { message: "Quiz title is required" }).max(200),
    isAdaptive: z.boolean().optional(),
    isLocked: z.boolean().optional(),
    timeLimit: z.number().int().positive().optional(),
    passingScore: z.number().positive().optional(),
  }),
});

const updateQuizValidation = z.object({
  body: z.object({
    title: z.string().min(1).max(200).optional(),
    isAdaptive: z.boolean().optional(),
    isLocked: z.boolean().optional(),
    timeLimit: z.number().int().positive().optional(),
    passingScore: z.number().positive().optional(),
  }),
});

export const quizValidation = {
  createQuizValidation,
  updateQuizValidation,
};