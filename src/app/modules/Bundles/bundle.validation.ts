import { z } from "zod";

const createCourseBundleValidation = z.object({
  body: z.object({
    title: z.string().min(1, { message: "Title is required" }).max(200),
    description: z.string().min(1, { message: "Description is required" }),
    isPublished: z.boolean().optional(),
    items: z.array(z.object({
      courseId: z.string().min(1),
    })).optional(),
  }),
});

 



export const courseBundleValidation = {
  createCourseBundleValidation,

};