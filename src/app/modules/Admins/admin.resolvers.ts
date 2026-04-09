import { adminService } from "./admin.service";
import { IPaginationOptions } from "../../../utils/pagination";

interface PaginationArgs {
  pagination?: {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  };
}

export const adminResolvers = {
  Query: {
    admin: async (_: unknown, { id }: { id: string }) => {
      return await adminService.getAdminById(id);
    },
    getAllAdmins: async (_: unknown, args: PaginationArgs) => {
      const paginationOptions: IPaginationOptions = {
        page: args.pagination?.page || 1,
        limit: args.pagination?.limit || 10,
        sortBy: args.pagination?.sortBy || 'createdAt',
        sortOrder: args.pagination?.sortOrder || 'desc',
      };
      return await adminService.getAllAdmins(paginationOptions);
    },
    adminByEmail: async (_: unknown, { email }: { email: string }) => {
      return await adminService.getAdminByEmail(email);
    },
    adminProfile: async (_: unknown, { id }: { id: string }) => {
      return await adminService.getAdminProfile(id);
    },
  },
};


