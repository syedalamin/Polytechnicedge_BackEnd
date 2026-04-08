import prismaClient from "../../../config/prismaClient";
import { UserRole } from "../../../generated/prisma/enums";
import { ICreateAdmin, IUpdateAdmin } from "./admin.interface";
import { generateUsername } from "../../../utils/generateUsername";
import { hashPassword } from "../../../utils/hashPassword";
 

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

const deleteAdmin = async (id: string) => {
  const result = await prismaClient.adminProfile.delete({
    where: { id },
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

const getAdminById = async (id: string) => {
  const result = await prismaClient.adminProfile.findUnique({
    where: { id },
    include: {
      user: true,
    },
  });
  return result;
};

const getAllAdmins = async () => {
  const result = await prismaClient.adminProfile.findMany({
    include: {
      user: true,
    },
  });
  return result;
};

const getAdminByEmail = async (email: string) => {
  const result = await prismaClient.user.findUnique({
    where: { email },
    include: {
      adminProfile: {
        include: {
          user: true,
        },
      },
    },
  });
  return result?.adminProfile;
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
  getAdminById,
  getAllAdmins,
  getAdminByEmail,
  getAdminProfile,
};
