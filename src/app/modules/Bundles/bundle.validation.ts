import { z } from "zod";

const createCourseBundleValidation = z.object({
  body: z.object({
    title: z.string().min(1, { message: "Title is required" }).max(200),
    description: z.string().min(1, { message: "Description is required" }),
    price: z.number().positive({ message: "Price must be positive" }),
    isPublished: z.boolean().optional(),
    items: z.array(z.object({
      courseId: z.string().min(1),
      price: z.number().positive(),
    })).optional(),
  }),
});

const updateCourseBundleValidation = z.object({
  body: z.object({
    title: z.string().min(1).max(200).optional(),
    description: z.string().min(1).optional(),
    price: z.number().positive().optional(),
    isPublished: z.boolean().optional(),
  }),
});

const addBundleItemValidation = z.object({
  body: z.object({
    courseId: z.string().min(1, { message: "Course ID is required" }),
    price: z.number().positive({ message: "Price must be positive" }),
  }),
});

export const courseBundleValidation = {
  createCourseBundleValidation,
  updateCourseBundleValidation,
  addBundleItemValidation,
};