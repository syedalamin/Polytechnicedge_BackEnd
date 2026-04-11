import { z } from "zod";

const createModuleValidation = z.object({
  body: z.object({
    courseId: z.string().min(1, { message: "Course ID is required" }),
    weekNumber: z
      .number()
      .int()
      .positive({ message: "Week number must be a positive integer" }),
    title: z
      .string()
      .min(1, { message: "Module title is required" })
      .max(200, { message: "Module title cannot exceed 200 characters" }),
    textInstruction: z.string().optional(),
    estimatedDuration: z
      .number()
      .int()
      .positive({ message: "Estimated duration must be a positive integer" }),
  }),
});

const updateModuleValidation = z.object({
  body: z.object({
    weekNumber: z
      .number()
      .int()
      .positive({ message: "Week number must be a positive integer" })
      .optional(),
    title: z
      .string()
      .min(1, { message: "Module title is required" })
      .max(200, { message: "Module title cannot exceed 200 characters" })
      .optional(),
    textInstruction: z.string().optional(),
    estimatedDuration: z
      .number()
      .int()
      .positive({ message: "Estimated duration must be a positive integer" })
      .optional(),
  }),
});

export const moduleValidation = {
  createModuleValidation,
  updateModuleValidation,
};