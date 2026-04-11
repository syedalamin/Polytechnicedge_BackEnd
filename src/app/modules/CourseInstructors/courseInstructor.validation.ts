import { z } from "zod";

const createCourseInstructorValidation = z.object({
  body: z.object({
    courseId: z.string().min(1, { message: "Course ID is required" }),
    instructorId: z.string().min(1, { message: "Instructor ID is required" }),
  }),
});

export const courseInstructorValidation = {
  createCourseInstructorValidation,
};