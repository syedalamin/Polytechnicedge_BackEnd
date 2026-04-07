import { z } from 'zod';

export const paginationSchema = z.object({
  query: z.object({
    page: z.coerce.number().min(1).optional().default(1),
    limit: z.coerce.number().min(1).max(100).optional().default(10),
    search: z.string().optional(),
    role: z.enum(['STUDENT', 'INSTRUCTOR', 'ADMIN']).optional(),
  }),
});

export const updateUserSchema = z.object({
  params: z.object({ id: z.string().uuid() }),
  body: z.object({
    role: z.enum(['STUDENT', 'INSTRUCTOR', 'ADMIN']).optional(),
    firstName: z.string().min(1).optional(),
    lastName: z.string().min(1).optional(),
    isActive: z.boolean().optional(),
  }),
});

export const adminValidation = {
  paginationSchema,
  updateUserSchema,
};
