import { z } from "zod";
import { passwordRegex } from "../Admins/admin.validation";

const createStudentValidation = z.object({
  body: z.object({
    email: z.email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(passwordRegex, {
        message:
          "Password must contain at least one uppercase, one lowercase, one number and one special character",
      }),
    firstName: z
      .string()
      .min(1, { message: "First name is required" })
      .max(100, { message: "First name cannot exceed 100 characters" })
      .optional(),
    middleName: z
      .string()
      .max(100, { message: "Middle name cannot exceed 100 characters" })
      .optional(),
    lastName: z
      .string()
      .min(1, { message: "Last name is required" })
      .max(100, { message: "Last name cannot exceed 100 characters" })
      .optional(),
    bio: z
      .string()
      .max(500, { message: "Bio cannot exceed 500 characters" })
      .optional(),
    address: z
      .string()
      .max(255, { message: "Address cannot exceed 255 characters" })
      .optional(),
    gender: z
      .string()
      .max(50, { message: "Gender cannot exceed 50 characters" })
      .optional(),
    profileImage: z.string().url().optional(),
    backgroundImage: z.string().url().optional(),
    contactNumber1: z
      .string()
      .max(20, { message: "Contact number cannot exceed 20 characters" })
      .optional(),
    contactNumber2: z
      .string()
      .max(20, { message: "Contact number cannot exceed 20 characters" })
      .optional(),
    educationLevel: z
      .string()
      .max(100, { message: "Education level cannot exceed 100 characters" })
      .optional(),
    interests: z.array(z.string()).optional(),
    dateOfBirth: z.string().optional(),
  }),
});
const updateStudentValidation = z.object({
  body: z.object({
    firstName: z
      .string()
      .min(1, { message: "First name is required" })
      .max(100, { message: "First name cannot exceed 100 characters" })
      .optional(),
    middleName: z
      .string()
      .max(100, { message: "Middle name cannot exceed 100 characters" })
      .optional(),
    lastName: z
      .string()
      .min(1, { message: "Last name is required" })
      .max(100, { message: "Last name cannot exceed 100 characters" })
      .optional(),
    bio: z
      .string()
      .max(500, { message: "Bio cannot exceed 500 characters" })
      .optional(),
    address: z
      .string()
      .max(255, { message: "Address cannot exceed 255 characters" })
      .optional(),
    gender: z
      .string()
      .max(50, { message: "Gender cannot exceed 50 characters" })
      .optional(),
    profileImage: z.string().url().optional(),
    backgroundImage: z.string().url().optional(),
    contactNumber1: z
      .string()
      .max(20, { message: "Contact number cannot exceed 20 characters" })
      .optional(),
    contactNumber2: z
      .string()
      .max(20, { message: "Contact number cannot exceed 20 characters" })
      .optional(),
    educationLevel: z
      .string()
      .max(100, { message: "Education level cannot exceed 100 characters" })
      .optional(),
    interests: z.array(z.string()).optional(),
    dateOfBirth: z.string().optional(),
  }),
});

export const studentsValidation = {
  updateStudentValidation,
  createStudentValidation,
};
