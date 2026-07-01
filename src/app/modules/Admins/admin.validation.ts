import { z } from "zod";
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
 const createAdminValidation = z.object({
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
    gender: z
      .string()
      .max(50, { message: "Gender cannot exceed 50 characters" })
      .optional(),
    profileImage: z.url().optional(),
    backgroundImage: z.url().optional(),
    contactNumber1: z
      .string()
      .max(20, { message: "Contact number cannot exceed 20 characters" })
      .optional(),
    contactNumber2: z
      .string()
      .max(20, { message: "Contact number cannot exceed 20 characters" })
      .optional(),
    dateOfBirth: z.string().optional(),
  }),
});

 const updateAdminValidation = z.object({
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
    profileImage: z.url().optional(),
    backgroundImage: z.url().optional(),
    contactNumber1: z
      .string()
      .max(20, { message: "Contact number cannot exceed 20 characters" })
      .optional(),
    contactNumber2: z
      .string()
      .max(20, { message: "Contact number cannot exceed 20 characters" })
      .optional(),
    dateOfBirth: z.string().optional(),
  }),
});

export const adminValidation = {
  createAdminValidation,
  updateAdminValidation,
};
