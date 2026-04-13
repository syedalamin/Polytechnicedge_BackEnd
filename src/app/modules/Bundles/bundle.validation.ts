import { z } from "zod";

const createCourseBundleValidation = z.object({
  body: z.object({
    title: z.string().min(1, { message: "Title is required" }).max(200),
    description: z.string().min(1, { message: "Description is required" }),
    isPublished: z.boolean().optional(),
    items: z
      .array(
        z.object({
          courseId: z.string().min(1),
        }),
      )
      .optional(),
  }),
});
const updateCourseBundleValidation = z.object({
  body: z.object({
    
    description: z.string().min(1, { message: "Description is required" }).optional(),
    isPublished: z.boolean().optional(),
    items: z
      .array(
        z.object({
          courseId: z.string().min(1),
        }),
      )
      .optional(),
    removeItems: z
      .array(z.string().min(1))
      .optional(),
  }),
});

export const courseBundleValidation = {
  createCourseBundleValidation,
  updateCourseBundleValidation,
};
