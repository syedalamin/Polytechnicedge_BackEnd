import prismaClient from "../../../config/prismaClient";
import { calculatePagination } from "../../../utils/pagination";
import { UserRole } from "../../../generated/prisma/enums";
import {
  IUserFilter,
  IPaginationOptions,
  IPaginatedUsers,
  IUpdateMe,
} from "./user.interface";
import { ApiError } from "../../../errors/apiError";
import status from "http-status";

const getAllUsers = async (
  filter: IUserFilter,
  paginationOptions: IPaginationOptions,
): Promise<IPaginatedUsers> => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);
  const where: any = {};
  if (filter.role) where.role = filter.role;
  if (filter.emailVerified !== undefined)
    where.emailVerified = filter.emailVerified;
  if (filter.search) {
    where.OR = [
      { email: { contains: filter.search, mode: "insensitive" } },
      { username: { contains: filter.search, mode: "insensitive" } },
    ];
  }

  const [result, total] = await Promise.all([
    prismaClient.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
      include: {
        adminProfile: true,
        instructorProfile: true,
        studentProfile: true,
        orders: true,
        payments: true,
        enrollments: true,
        userProgress: true,
        certificates: true,
        notices: true,
        quizAttempts: true,
        courses: true,
      },
    }),
    prismaClient.user.count({ where }),
  ]);

  return {
    users: result,
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
};

const getUserById = async (id: string) => {
  const result = await prismaClient.user.findUnique({
    where: { id },
    include: {
      adminProfile: true,
      instructorProfile: true,
      studentProfile: true,
      orders: true,
      payments: true,
      enrollments: true,
      userProgress: true,
      certificates: true,
      notices: true,
      quizAttempts: true,
      courses: true,
    },
  });

  return result;
};

const getMe = async (userId: string) => {
  if (!userId) {
    throw new Error("User ID not found in request");
  }
  const user = await prismaClient.user.findUnique({
    where: { id: userId },
    include: {
      adminProfile: true,
      instructorProfile: {
        include: {
          courseInstructors: {
            include: {
              course: {
                
                include: {
                  category: true,
                }
              },
            }
          },
        },
      },
      studentProfile: true,
      orders: true,
      payments: true,
      enrollments: {
        include: {
          course: {
            include: {
              modules: {
                include: {
                  contents: true,
                },
              },
            },
          },
        },
      },
      userProgress: true,
      certificates: true,
      notices: true,
      quizAttempts: true,
      courses: true,
    },
  });

  return user;
};

const updateMe = async (userId: string, data: IUpdateMe) => {
  if (!userId) {
    throw new ApiError(status.NOT_FOUND, "User ID not found in request");
  }

  const user = await prismaClient.user.findUnique({
    where: { id: userId },
    include: {
      adminProfile: true,
      instructorProfile: true,
      studentProfile: true,
    },
  });

  if (!user) {
    throw new ApiError(status.NOT_FOUND, "User not found");
  }

  const { adminData, instructorData, studentData } = data;

  const result = await prismaClient.$transaction(async (tx) => {
    switch (user.role) {
      case UserRole.ADMIN:
        if (user.adminProfile && adminData) {
          await tx.adminProfile.update({
            where: { id: user.adminProfile.id },
            data: adminData,
          });
        }
        break;
      case UserRole.INSTRUCTOR:
        if (user.instructorProfile && instructorData) {
          await tx.instructorProfile.update({
            where: { id: user.instructorProfile.id },
            data: instructorData,
          });
        }
        break;
      case UserRole.STUDENT:
        if (user.studentProfile && studentData) {
          await tx.studentProfile.update({
            where: { id: user.studentProfile.id },
            data: studentData,
          });
        }
        break;
    }

    return tx.user.findUnique({
      where: { id: userId },
      include: {
        adminProfile: true,
        instructorProfile: true,
        studentProfile: true,
        orders: true,
        payments: true,
        enrollments: true,
        userProgress: true,
        certificates: true,
        notices: true,
        quizAttempts: true,
        courses: true,
      },
    });
  });

  return result;
};

export const userService = {
  getAllUsers,
  getUserById,
  getMe,
  updateMe,
};
