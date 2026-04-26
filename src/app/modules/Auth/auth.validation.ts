import z from "zod";

const loginValidation = z.object({
  body: z.object({
    email: z.email({ message: "Invalid email address" }),
    password: z.string().min(1, { message: "Password is required" }),
  }),
});

const changePasswordValidation = z.object({
  body: z.object({
    oldPassword: z.string().min(1, { message: "Old password is required" }),
    newPassword: z
      .string()
      .min(6, { message: "New password must be at least 6 characters" }),
  }),
});

const forgetPasswordValidation = z.object({
  body: z.object({
    email: z.email({ message: "Invalid email address" }),
  }),
});

const resetPasswordValidation = z.object({
  body: z.object({
    token: z.string().min(1, { message: "Token is required" }),
    newPassword: z
      .string()
      .min(6, { message: "New password must be at least 6 characters" }),
  }),
});
const verifyEmailOtpAndLoginValidation = z.object({
  body: z.object({
    email: z.string().min(1, { message: "Email is required" }),
    otp: z.string().min(6, { message: "OTP must be at least 6 characters" }),
  }),
});
const resendOtpValidation = z.object({
  body: z.object({
    email: z.string().min(1, { message: "Email is required" }),
  }),
});

export const authValidation = {
  loginValidation,
  changePasswordValidation,
  forgetPasswordValidation,
  resetPasswordValidation,
  verifyEmailOtpAndLoginValidation,
  resendOtpValidation,
};
