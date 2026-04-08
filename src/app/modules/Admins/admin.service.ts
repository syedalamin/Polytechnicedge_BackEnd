
import prismaClient from '../../../config/prismaClient';
import { ICreateAdmin, IUpdateAdmin } from './admin.interface';

const createAdmin = async (adminData: ICreateAdmin) => {
  const result = await  prismaClient.adminProfile.create({
    data: adminData,
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
    data,
  });
  return result;
};

const getAdminById = async (id: string) => {
  const result = await prismaClient.adminProfile.findUnique({
    where: { id },
  });
  return result;
};

const getAllAdmins = async () => {
  const result = await prismaClient.adminProfile.findMany();
  return result;
};

const getAdminByEmail = async (email: string) => {
  const result = await prismaClient.user.findUnique({
    where: { email },
    include: {
      adminProfile: true,
    },
  });
  return result?.adminProfile;
};

const getAdminProfile = async (id: string) => {
  const result = await prismaClient.adminProfile.findUnique({
    where: { id },
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