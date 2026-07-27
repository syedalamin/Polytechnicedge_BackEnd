import { z } from "zod";
import { CourseLevel } from "../../../generated/prisma/enums";

const createCourseValidation = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, { message: "Course title is required" })
      .max(200, { message: "Course title cannot exceed 200 characters" }),
    shortDescription: z
      .string()
      .max(500, { message: "Short description cannot exceed 500 characters" })
      .optional(),
    longDescription: z.string().optional(),
    thumbnail: z.url().optional(),
    previewVideoUrl: z.url().optional(),
    price: z.number().min(0, { message: "Price must be a positive number" }),
    level: z.enum(Object.values(CourseLevel)).optional(),
    categoryId: z.string().min(1, { message: "Category ID is required" }),
    durationHours: z.number().positive().optional(),
    whatYouWillLearn: z.array(z.string()).optional(),
    requirements: z.array(z.string()).optional(),
    prerequisites: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    accessExpiresInDays: z.number().int().positive().optional(),
  }),
});

const updateCourseValidation = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, { message: "Course title is required" })
      .max(200, { message: "Course title cannot exceed 200 characters" })
      .optional(),
    shortDescription: z
      .string()
      .max(500, { message: "Short description cannot exceed 500 characters" })
      .optional(),
    longDescription: z.string().optional(),
    thumbnail: z.url().optional(),
    previewVideoUrl: z.url().optional(),
    price: z
      .number()
      .min(0, { message: "Price must be a positive number" })
      .optional(),
    level: z.enum(Object.values(CourseLevel)).optional(),
    categoryId: z
      .string()
      .min(1, { message: "Category ID is required" })
      .optional(),
    durationHours: z.number().positive().optional(),
    whatYouWillLearn: z.array(z.string()).optional(),
    requirements: z.array(z.string()).optional(),
    prerequisites: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    accessExpiresInDays: z.number().int().positive().optional(),
  }),
});

export const courseValidation = {
  createCourseValidation,
  updateCourseValidation,
};
