import { z } from 'zod';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const createUserValidation = z.object({
  body: z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    username: z
      .string()
      .min(3, { message: 'Username must be at least 3 characters' })
      .max(30, { message: 'Username cannot exceed 30 characters' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .regex(passwordRegex, {
        message:
          'Password must contain at least one uppercase, one lowercase, one number and one special character',
      }),
     
  }),
});

export const loginValidation = z.object({
  body: z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(1, { message: 'Password is required' }),
  }),
});

export const changePasswordValidation = z.object({
  body: z.object({
    currentPassword: z.string().min(1, { message: 'Current password is required' }),
    newPassword: z
      .string()
      .min(8, { message: 'New password must be at least 8 characters' })
      .regex(passwordRegex, {
        message:
          'New password must contain at least one uppercase, one lowercase, one number and one special character',
      }),
  }),
});

export const updateProfileValidation = z.object({
  body: z.object({
    username: z
      .string()
      .min(3, { message: 'Username must be at least 3 characters' })
      .max(30, { message: 'Username cannot exceed 30 characters' })
      .optional(),
  }),
});

export const userValidation = {
  createUserValidation,
  loginValidation,
  changePasswordValidation,
  updateProfileValidation,
};
