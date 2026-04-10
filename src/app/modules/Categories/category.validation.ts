import { z } from "zod";

const createCategoryValidation = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, { message: "Category name is required" })
      .max(100, { message: "Category name cannot exceed 100 characters" }),
    description: z
      .string()
      .max(500, { message: "Description cannot exceed 500 characters" })
      .optional(),
  }),
});

const updateCategoryValidation = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, { message: "Category name is required" })
      .max(100, { message: "Category name cannot exceed 100 characters" })
      .optional(),
    description: z
      .string()
      .max(500, { message: "Description cannot exceed 500 characters" })
      .optional(),
  }),
});

export const categoryValidation = {
  createCategoryValidation,
  updateCategoryValidation,
};