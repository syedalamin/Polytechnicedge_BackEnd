import prismaClient from "../../../config/prismaClient";
import { UserRole } from "../../../generated/prisma/enums";
import {
  ICreateAdmin,
  IUpdateAdmin,
  IPaginationOptions,
  IPaginatedAdmins,
} from "./admin.interface";
import { generateUsername } from "../../../utils/generateUsername";
import { hashPassword } from "../../../utils/hashPassword";
import { calculatePagination } from "../../../utils/pagination";
import redis from "../../../utils/redis";

const createAdmin = async (adminData: ICreateAdmin) => {
  const username = await generateUsername(
    adminData.firstName,
    adminData.middleName,
    adminData.lastName,
  );
  const hashedPassword = await hashPassword(adminData.password);

  const result = await prismaClient.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email: adminData.email,
        password: hashedPassword,
        username,
        role: UserRole.ADMIN,
      },
    });

    const admin = await tx.adminProfile.create({
      data: {
        userId: user.id,
        firstName: adminData.firstName,
        middleName: adminData.middleName || null,
        lastName: adminData.lastName,
        bio: adminData.bio || null,
        address: adminData.address || null,
        dateOfBirth: adminData.dateOfBirth
          ? new Date(adminData.dateOfBirth)
          : null,
      },
    });

    return admin;
  });

  return result;
};

const updateAdminProfile = async (id: string, data: IUpdateAdmin) => {
  const result = await prismaClient.adminProfile.update({
    where: { id },
    data: {
      ...data,
      dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
    },
  });
  await redis.del(`admins:${result.id}`);
  return result;
};

const deleteAdmin = async (id: string) => {
  const result = await prismaClient.adminProfile.delete({
    where: { id },
  });
  await redis.del(`admins:${result.id}`);
  return result;
};

const getAllAdmins = async (
  paginationOptions: IPaginationOptions,
): Promise<IPaginatedAdmins> => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const [result, total] = await Promise.all([
    prismaClient.adminProfile.findMany({
      include: {
        user: true,
      },
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
    }),
    prismaClient.adminProfile.count(),
  ]);

  return {
    admins: result,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getAdminProfile = async (id: string) => {
  const cacheKey = `admins:${id}`;
  const cachedData = await redis.get(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  const result = await prismaClient.adminProfile.findUnique({
    where: { id },
    include: {
      user: true,
    },
  });

  if (result) {
    await redis.set(cacheKey, result, 600);
  }
  return result;
};

export const adminService = {
  createAdmin,
  deleteAdmin,
  updateAdminProfile,

  getAllAdmins,

  getAdminProfile,
};
