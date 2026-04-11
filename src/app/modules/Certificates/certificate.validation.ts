import { z } from "zod";

const createCertificateValidation = z.object({
  body: z.object({
    userId: z.string().min(1, { message: "User ID is required" }),
    courseId: z.string().min(1, { message: "Course ID is required" }),
    certificateUrl: z.string().url({ message: "Certificate URL is required" }),
  }),
});

export const certificateValidation = {
  createCertificateValidation,
};