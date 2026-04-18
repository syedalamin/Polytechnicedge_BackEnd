import { Request } from "express";
import prismaClient from "../../../config/prismaClient";
import { calculatePagination } from "../../../utils/pagination";
import {
  IUserFilter,
  IPaginationOptions,
  IPaginatedUsers,
 
} from "./user.interface";

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

  return user;
};


export const userService = {
  getAllUsers,
  getUserById,
  getMe,
};