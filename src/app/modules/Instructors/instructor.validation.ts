import { z } from "zod";
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const createInstructorValidation = z.object({
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
      .max(100, { message: "First name cannot exceed 100 characters" }),
    middleName: z
      .string()
      .max(100, { message: "Middle name cannot exceed 100 characters" })
      .optional(),
    lastName: z
      .string()
      .min(1, { message: "Last name is required" })
      .max(100, { message: "Last name cannot exceed 100 characters" }),
    bio: z
      .string()
      .max(500, { message: "Bio cannot exceed 500 characters" })
      .optional(),
    address: z
      .string()
      .max(255, { message: "Address cannot exceed 255 characters" })
      .optional(),
    gender: z.string().optional(),
    expertise: z.array(z.string()).optional(),
    qualification: z
      .string()
      .max(255, { message: "Qualification cannot exceed 255 characters" })
      .optional(),
    experienceYears: z.number().optional(),
    linkedin: z.string().url().optional().or(z.literal("")),
    website: z.string().url().optional().or(z.literal("")),
    contactNumber1: z
      .string()
      .max(20, { message: "Contact number cannot exceed 20 characters" })
      .optional(),
    contactNumber2: z
      .string()
      .max(20, { message: "Contact number cannot exceed 20 characters" })
      .optional(),
    profileImage: z.string().optional(),
    backgroundImage: z.string().optional(),
  }),
});

const updateInstructorValidation = z.object({
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
    gender: z.string().optional(),
    expertise: z.array(z.string()).optional(),
    qualification: z
      .string()
      .max(255, { message: "Qualification cannot exceed 255 characters" })
      .optional(),
    experienceYears: z.number().optional(),
    linkedin: z.string().url().optional().or(z.literal("")),
    website: z.string().url().optional().or(z.literal("")),
    contactNumber1: z
      .string()
      .max(20, { message: "Contact number cannot exceed 20 characters" })
      .optional(),
    contactNumber2: z
      .string()
      .max(20, { message: "Contact number cannot exceed 20 characters" })
      .optional(),
    profileImage: z.string().optional(),
    backgroundImage: z.string().optional(),
  }),
});

export const instructorValidation = {
  createInstructorValidation,
  updateInstructorValidation,
};