import { adminService } from "./admin.service";

export const adminResolvers = {
  Query: {
    admin: async (_: unknown, { id }: { id: string }) => {
      return await adminService.getAdminById(id);
    },
    admins: async () => {
      return await adminService.getAllAdmins();
    },
    adminByEmail: async (_: unknown, { email }: { email: string }) => {
      return await adminService.getAdminByEmail(email);
    },
    adminProfile: async (_: unknown, { id }: { id: string }) => {
      return await adminService.getAdminProfile(id);
    },
  },
};