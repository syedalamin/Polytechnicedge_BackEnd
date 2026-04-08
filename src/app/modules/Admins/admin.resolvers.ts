import { adminService } from './admin.service';

export const adminResolvers = {
  Query: {
    admin: async (_: any, { id }: { id: string }) => {
      return await adminService.getAdminById(id);
    },
    admins: async () => {
      return await adminService.getAllAdmins();
    },
    adminByEmail: async (_: any, { email }: { email: string }) => {
      return await adminService.getAdminByEmail(email);
    },
    adminProfile: async (_: any, { id }: { id: string }) => {
      return await adminService.getAdminProfile(id);
    },
  },
  Mutation: {
    createAdmin: async (_: any, { input }: { input: any }) => {
      return await adminService.createAdmin(input);
    },
    deleteAdmin: async (_: any, { id }: { id: string }) => {
      return await adminService.deleteAdmin(id);
    },
    updateAdminProfile: async (_: any, { id, input }: { id: string; input: any }) => {
      return await adminService.updateAdminProfile(id, input);
    },
  },
};