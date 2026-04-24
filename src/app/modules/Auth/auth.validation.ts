import z from "zod";

 const loginValidation = z.object({
  body: z.object({
    email: z.email({ message: 'Invalid email address' }),
    password: z.string().min(1, { message: 'Password is required' }),
  }),
});

const changePasswordValidation = z.object({
  body: z.object({
    oldPassword: z.string().min(1, { message: 'Old password is required' }),
    newPassword: z.string().min(6, { message: 'New password must be at least 6 characters' }),
  }),
});

export const authValidation = {
  loginValidation,
  changePasswordValidation,
};