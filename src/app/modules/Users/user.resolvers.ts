 
import { userService } from "./user.service";
import { IPaginationOptions } from "./user.interface";
import graphqlAuth from "../../middlewares/graphqlAuth";
import { UserRole } from "../../../generated/prisma/enums";

export const userResolvers = {
  Query: {
    allUsers: async (_: any, args: any, context: any) => {
      await graphqlAuth(context, UserRole.ADMIN, UserRole.SUPER_ADMIN);
      const filter = args.filter || {};
      const paginationOptions: IPaginationOptions = {
        page: args.pagination?.page || 1,
        limit: args.pagination?.limit || 10,
        sortBy: args.pagination?.sortBy || "createdAt",
        sortOrder: args.pagination?.sortOrder || "desc",
      };
      return await userService.getAllUsers(filter, paginationOptions);
    },
    user: async (_: any, { id }: { id: string }, context: any) => {
       await graphqlAuth(context, UserRole.ADMIN, UserRole.SUPER_ADMIN);
      return await userService.getUserById(id);
    },
   
  },
};
