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
   
    getAllAdmins: async (_: unknown, args: PaginationArgs) => {
      const paginationOptions: IPaginationOptions = {
        page: args.pagination?.page || 1,
        limit: args.pagination?.limit || 10,
        sortBy: args.pagination?.sortBy || 'createdAt',
        sortOrder: args.pagination?.sortOrder || 'desc',
      };
      return await adminService.getAllAdmins(paginationOptions);
    },
  
    adminProfile: async (_: unknown, { id }: { id: string }) => {
      return await adminService.getAdminProfile(id);
    },
  },
   
};


