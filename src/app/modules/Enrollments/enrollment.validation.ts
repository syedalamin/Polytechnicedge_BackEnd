import { z } from "zod";
import { EnrollmentStatus } from "../../../generated/prisma/enums";

const createEnrollmentValidation = z.object({
  body: z.object({
    userId: z.string().min(1, { message: "User ID is required" }),
    courseId: z.string().min(1, { message: "Course ID is required" }),
    expiresAt: z.string().optional(),
  }),
});

const updateEnrollmentValidation = z.object({
  body: z.object({
    status: z.enum(Object.values(EnrollmentStatus)).optional(),
    expiresAt: z.string().optional(),
  }),
});

export const enrollmentValidation = {
  createEnrollmentValidation,
  updateEnrollmentValidation,
};