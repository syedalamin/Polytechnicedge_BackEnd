import prismaClient from "../../../config/prismaClient";
import { generateToken, verifyToken } from "../../../lib/generateToken";
import { ApiError } from "../../../errors/apiError";
import { appConfig } from "../../../config/appConfig";
import { Request } from "express";
import { comparePassword, hashPassword } from "../../../utils/hashPassword";
import { sendEmail } from "../../../utils/sendEmail";
import status from "http-status";
import { ICreateStudent } from "../Students/student.interface";
import { generateUsername } from "../../../utils/generateUsername";
import { slugGeneratorUser } from "../../../utils/slugGeneratorUser";
import { UserRole } from "../../../generated/prisma/enums";
import { generateOTP } from "../../../utils/generateOTP";

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  loginData: {
    userId: string;
    role: UserRole;
  };
}
export type ILoginOtpResponse = {
  resendOtp: boolean;
  message: string;
  email: string;
};

const register = async (studentData: ICreateStudent) => {
  const username = await generateUsername(
    studentData.firstName,
    studentData.middleName,
    studentData.lastName,
  );
  const slug = await slugGeneratorUser(
    studentData.firstName,
    studentData.middleName,
    studentData.lastName,
  );

  const user = await prismaClient.user.findUnique({
    where: { email: studentData.email },
  });
  if (user?.emailVerified === false) {
    return {
      resendOtp: true,
      message: "User already exists. Resending OTP for email verification.",
      email: user.email,
    };
  } else if (user && user.emailVerified) {
    throw new ApiError(status.BAD_REQUEST, "User already exists");
  }

  const hashedPassword = await hashPassword(studentData.password);

  const otp = generateOTP();
  const hashedOtp = await hashPassword(otp);

  const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

  const result = await prismaClient.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email: studentData.email,
        username,
        slug,
        password: hashedPassword,
        role: UserRole.STUDENT,
        emailVerified: false,
        emailOtp: hashedOtp,
        emailOtpExpires: otpExpires,
        otpAttempts: 0,
        otpLastSentAt: new Date(),
      },
    });

    await tx.studentProfile.create({
      data: {
        userId: user.id,
        firstName: studentData.firstName,
        middleName: studentData.middleName || null,
        lastName: studentData.lastName,
        slug,
        username,
        bio: studentData.bio || null,
        address: studentData.address || null,
        gender: studentData.gender || null,
        profileImage: studentData.profileImage || null,
        backgroundImage: studentData.backgroundImage || null,
        contactNumber1: studentData.contactNumber1 || null,
        contactNumber2: studentData.contactNumber2 || null,
        educationLevel: studentData.educationLevel || null,
        interests: studentData.interests || [],
        dateOfBirth: studentData.dateOfBirth
          ? new Date(studentData.dateOfBirth)
          : null,
      },
    });

    return user;
  });

  const html = `
    <h1>Email Verification</h1>
    <p>Hi ${studentData.firstName} ${studentData.middleName} ${studentData.lastName},</p>
    <p>Your OTP for email verification is: <strong>${otp}</strong></p>
    <p>This OTP will expire in 5 minutes.</p>
    <p>If you didn't request this, please ignore this email.</p>
  `;

  await sendEmail(result.email, "Email Verification", html);
  return {
    message:
      "Registration successful. Please check your email for the OTP to verify your account.",
    email: result.email,
  };
};

const verifyEmailOtpAndLogin = async (email: string, otp: string) => {
  const user = await prismaClient.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new ApiError(status.NOT_FOUND, "User not found");
  }

  if (user.emailVerified) {
    throw new ApiError(status.BAD_REQUEST, "Already verified");
  }

  if (!user.emailOtpExpires || user.emailOtpExpires < new Date()) {
    throw new ApiError(status.UNAUTHORIZED, "OTP expired");
  }

  const isMatch = await comparePassword(otp, user.emailOtp as string);

  if (!isMatch) {
    await prismaClient.user.update({
      where: { email },
      data: {
        otpAttempts: { increment: 1 },
      },
    });

    throw new ApiError(status.UNAUTHORIZED, "Invalid OTP");
  }

  await prismaClient.user.update({
    where: { email },
    data: {
      emailVerified: true,
      emailOtp: null,
      emailOtpExpires: null,
      otpAttempts: 0,
      lastLogin: new Date(),
    },
  });

  const accessToken = generateToken(
    {
      userId: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    appConfig.jwt.accessSecret as string,
    appConfig.jwt.accessExpiresIn as string,
  );
  const refreshToken = generateToken(
    {
      userId: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    appConfig.jwt.refreshSecret as string,
    appConfig.jwt.refreshExpiresIn as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const resendOtp = async (email: string) => {
  const user = await prismaClient.user.findUnique({ where: { email } });

  if (!user) throw new ApiError(404, "User not found");

  if (user.emailVerified) {
    throw new ApiError(400, "Already verified");
  }

  const otp = generateOTP();
  const hashedOtp = await hashPassword(otp);

  await prismaClient.user.update({
    where: { email },
    data: {
      emailOtp: hashedOtp,
      emailOtpExpires: new Date(Date.now() + 5 * 60 * 1000),
      otpAttempts: 0,
      otpLastSentAt: new Date(),
    },
  });

  await sendEmail(email, "Resend OTP", `Your OTP: ${otp}`);
  return true;
};

const login = async (
  data: ILogin,
): Promise<ILoginResponse | ILoginOtpResponse> => {
  const user = await prismaClient.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw new ApiError(status.NOT_FOUND, "User not found");
  } else if (user.isDeleted) {
    throw new ApiError(
      status.BAD_REQUEST,
      "User account is deleted. Please contact support.",
    );
  } else if (user?.emailVerified === false) {
    return {
      resendOtp: true,
      message: "User already exists. Resending OTP for email verification.",
      email: user.email,
    };
  }

  const isPasswordValid = await comparePassword(data.password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(status.UNAUTHORIZED, "Invalid password");
  }

  const accessToken = generateToken(
    {
      userId: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    appConfig.jwt.accessSecret as string,
    appConfig.jwt.accessExpiresIn as string,
  );
  const refreshToken = generateToken(
    {
      userId: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    appConfig.jwt.refreshSecret as string,
    appConfig.jwt.refreshExpiresIn as string,
  );
  const loginData = {
    userId: user.id,
    role: user.role,
  }

  return {
    accessToken,
    refreshToken,
    loginData,
  };
};

const refreshToken = async (refreshToken: string) => {
  const decoded = verifyToken(
    refreshToken,
    appConfig.jwt.refreshSecret as string,
  );
  if (!decoded) {
    throw new ApiError(status.UNAUTHORIZED, "Invalid refresh token");
  }

  const user = await prismaClient.user.findUnique({
    where: { id: decoded.userId },
  });

  if (!user) {
    throw new ApiError(status.UNAUTHORIZED, "Invalid refresh token");
  }

  const payload = {
    userId: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateToken(
    payload,
    appConfig.jwt.accessSecret as string,
    appConfig.jwt.accessExpiresIn as string,
  );

  return accessToken;
};

const changePassword = async (req: Request) => {
  const userId = req.user?.userId;
  if (!userId) {
    throw new ApiError(status.UNAUTHORIZED, "User not authenticated");
  }

  const { oldPassword, newPassword } = req.body;
  const user = await prismaClient.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new ApiError(status.NOT_FOUND, "User not found");
  }

  const isPasswordValid = await comparePassword(oldPassword, user.password);
  if (!isPasswordValid) {
    throw new ApiError(status.UNAUTHORIZED, "Invalid old password");
  }

  const hashedNewPassword = await hashPassword(newPassword);

  await prismaClient.user.update({
    where: { id: userId },
    data: { password: hashedNewPassword },
  });

  const accessToken = generateToken(
    {
      userId: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    appConfig.jwt.accessSecret as string,
    appConfig.jwt.accessExpiresIn as string,
  );

  return accessToken;
};

const forgetPassword = async (email: string): Promise<string> => {
  const user = await prismaClient.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new ApiError(status.NOT_FOUND, "User not found");
  }

  const resetToken = generateToken(
    {
      userId: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    appConfig.jwt.resetSecret as string,
    appConfig.jwt.resetExpiresIn as string,
  );

  const resetUrl = `${appConfig.frontendUrl}/reset-password?token=${resetToken}`;
  const html = `
    <h1>Password Reset Request</h1>
    <p>Hi ${user.username},</p>
    <p>You requested to reset your password. Click the link below to reset it:</p>
    <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
    <p>This link will expire in 5 minutes.</p>
    <p>If you didn't request this, please ignore this email.</p>
  `;
  await sendEmail(email, "Password Reset Request", html);

  return resetToken;
};

const resetPassword = async (
  token: string,
  newPassword: string,
): Promise<void> => {
  const decoded = verifyToken(token, appConfig.jwt.resetSecret as string);

  if (!decoded || !decoded.userId) {
    throw new ApiError(status.BAD_REQUEST, "Invalid or expired reset token");
  }

  const user = await prismaClient.user.findUnique({
    where: { id: decoded.userId },
  });

  if (!user) {
    throw new ApiError(status.NOT_FOUND, "User not found");
  }

  const hashedNewPassword = await hashPassword(newPassword);

  await prismaClient.user.update({
    where: { id: user.id },
    data: { password: hashedNewPassword },
  });
};

export const authService = {
  register,
  verifyEmailOtpAndLogin,
  resendOtp,
  login,
  refreshToken,
  changePassword,
  forgetPassword,
  resetPassword,
};
