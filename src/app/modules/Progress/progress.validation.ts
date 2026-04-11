import { z } from "zod";

const createUserProgressValidation = z.object({
  body: z.object({
    userId: z.string().min(1, { message: "User ID is required" }),
    courseId: z.string().min(1, { message: "Course ID is required" }),
    progress: z.number().min(0).max(100).optional(),
  }),
});

const updateUserProgressValidation = z.object({
  body: z.object({
    progress: z.number().min(0).max(100).optional(),
    isCompleted: z.boolean().optional(),
    lastAccessed: z.string().optional(),
    completedAt: z.string().optional(),
  }),
});

export const userProgressValidation = {
  createUserProgressValidation,
  updateUserProgressValidation,
};