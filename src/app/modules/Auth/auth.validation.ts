import z from "zod";

 const loginValidation = z.object({
  body: z.object({
    email: z.email({ message: 'Invalid email address' }),
    password: z.string().min(1, { message: 'Password is required' }),
  }),
});

export const authValidation = {
  loginValidation,
};