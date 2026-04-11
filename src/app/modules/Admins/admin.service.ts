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
import { slugGeneratorUser } from "../../../utils/slugGeneratorUser";

const createAdmin = async (adminData: ICreateAdmin) => {
  const username = await generateUsername(
    adminData.firstName,
    adminData.middleName,
    adminData.lastName,
  );
  const slug = await slugGeneratorUser(
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
        slug,
        role: UserRole.ADMIN,
      },
    });

    const admin = await tx.adminProfile.create({
      data: {
        userId: user.id,
        firstName: adminData.firstName,
        middleName: adminData.middleName || null,
        lastName: adminData.lastName,
        slug,
        username,
        bio: adminData.bio || null,
        address: adminData.address || null,
        gender: adminData.gender || null,
        profileImage: adminData.profileImage || null,
        backgroundImage: adminData.backgroundImage || null,
        contactNumber1: adminData.contactNumber1 || null,
        contactNumber2: adminData.contactNumber2 || null,
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
  return result;
};

const deleteAdmin = async (id: string) => {
  const result = await prismaClient.adminProfile.delete({
    where: { id },
  });
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
  const result = await prismaClient.adminProfile.findUnique({
    where: { id },
    include: {
      user: true,
    },
  });

  return result;
};

export const adminService = {
  createAdmin,
  deleteAdmin,
  updateAdminProfile,

  getAllAdmins,

  getAdminProfile,
};