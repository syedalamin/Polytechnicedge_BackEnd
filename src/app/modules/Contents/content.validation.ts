import { z } from "zod";
import { ContentType } from "../../../generated/prisma/enums";

const createContentValidation = z.object({
  body: z.object({
    moduleId: z.string().min(1, { message: "Module ID is required" }),
    title: z
      .string()
      .min(1, { message: "Content title is required" })
      .max(200, { message: "Content title cannot exceed 200 characters" }),
    contentType: z.nativeEnum(ContentType, {
      message: "Invalid content type",
    }),
    contentUrl: z.string().optional(),
    textContent: z.string().optional(),
    isLocked: z.boolean().optional(),
    duration: z.number().int().positive().optional(),
  }),
});

const updateContentValidation = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, { message: "Content title is required" })
      .max(200, { message: "Content title cannot exceed 200 characters" })
      .optional(),
    contentType: z.nativeEnum(ContentType).optional(),
    contentUrl: z.string().optional(),
    textContent: z.string().optional(),
    isLocked: z.boolean().optional(),
    duration: z.number().int().positive().optional(),
  }),
});

export const contentValidation = {
  createContentValidation,
  updateContentValidation,
};