import { z } from "zod";

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const createInstructorValidation = z.object({
  body: z.object({
    email: z.email(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(passwordRegex, {
        message:
          "Password must contain at least one uppercase, one lowercase, one number and one special character",
      }),
    firstName: z
      .string()
      .min(1, "First name is required")
      .max(100, "First name cannot exceed 100 characters"),
    middleName: z
      .string()
      .max(100, "Middle name cannot exceed 100 characters")
      .optional(),
    lastName: z
      .string()
      .min(1, "Last name is required")
      .max(100, "Last name cannot exceed 100 characters"),
    bio: z
      .string()
      .max(500, "Bio cannot exceed 500 characters")
      .optional(),
    address: z
      .string()
      .max(255, "Address cannot exceed 255 characters")
      .optional(),
    gender: z.string().optional(),
    dateOfBirth: z.date().optional(),
    expertise: z.array(z.string()).optional(),
    qualification: z
      .string()
      .max(255, "Qualification cannot exceed 255 characters")
      .optional(),
    experienceYears: z.number().optional(),
    linkedin: z.url().optional().or(z.literal("")),
    website: z.url().optional().or(z.literal("")),
    contactNumber1: z
      .string()
      .max(20, "Contact number cannot exceed 20 characters")
      .optional(),
    contactNumber2: z
      .string()
      .max(20, "Contact number cannot exceed 20 characters")
      .optional(),
    profileImage: z.string().optional(),
    backgroundImage: z.string().optional(),
  }),
});

const updateInstructorValidation = z.object({
  body: z.object({
    firstName: z
      .string()
      .min(1, "First name is required")
      .max(100, "First name cannot exceed 100 characters")
      .optional(),
    middleName: z
      .string()
      .max(100, "Middle name cannot exceed 100 characters")
      .optional(),
    lastName: z
      .string()
      .min(1, "Last name is required")
      .max(100, "Last name cannot exceed 100 characters")
      .optional(),
    bio: z
      .string()
      .max(500, "Bio cannot exceed 500 characters")
      .optional(),
    address: z
      .string()
      .max(255, "Address cannot exceed 255 characters")
      .optional(),
    gender: z.string().optional(),
    dateOfBirth: z.date().optional(),
    expertise: z.array(z.string()).optional(),
    qualification: z
      .string()
      .max(255, "Qualification cannot exceed 255 characters")
      .optional(),
    experienceYears: z.number().optional(),
    linkedin: z.url().optional().or(z.literal("")),
    website: z.url().optional().or(z.literal("")),
    contactNumber1: z
      .string()
      .max(20, "Contact number cannot exceed 20 characters")
      .optional(),
    contactNumber2: z
      .string()
      .max(20, "Contact number cannot exceed 20 characters")
      .optional(),
    profileImage: z.string().optional(),
    backgroundImage: z.string().optional(),
  }),
});

export const instructorValidation = {
  createInstructorValidation,
  updateInstructorValidation,
};
