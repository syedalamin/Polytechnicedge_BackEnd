import prismaClient from "../../../config/prismaClient";
import {
  IUserFilter,
  IPaginationOptions,
  IPaginatedUsers,
} from "./user.interface";
import { calculatePagination } from "../../../utils/pagination";


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
    },
  });

  return result;
};



export const userService = {
  getAllUsers,
  getUserById,
 
};
