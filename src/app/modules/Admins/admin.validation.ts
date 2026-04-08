import { z } from 'zod';

export const createAdminValidation = z.object({
  body: z.object({
    userId: z.string().uuid(),
    firstName: z.string().min(1),
    middleName: z.string().optional(),
    lastName: z.string().min(1),
    bio: z.string().optional(),
    address: z.string().optional(),
    dateOfBirth: z.string().datetime().optional(),
  }),
});

export const updateAdminValidation = z.object({
  body: z.object({
    firstName: z.string().min(1).optional(),
    middleName: z.string().optional(),
    lastName: z.string().min(1).optional(),
    bio: z.string().optional(),
    address: z.string().optional(),
    dateOfBirth: z.string().datetime().optional(),
  }),
});

export const adminValidation = {
  createAdminValidation,
  updateAdminValidation,
};