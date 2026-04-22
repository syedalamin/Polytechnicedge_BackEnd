import { userService } from "./user.service";
import { IPaginationOptions, IUpdateMe } from "./user.interface";
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
    me: async (_: any, __: any, context: any) => {
      await graphqlAuth(
        context,
        UserRole.ADMIN,
        UserRole.INSTRUCTOR,
        UserRole.STUDENT,
        UserRole.SUPER_ADMIN,
      );
      const { req } = context;
      const userId = req.user.userId;
      return await userService.getMe(userId);
    },
  },
  Mutation: {
    updateMe: async (_: any, { data }: { data: IUpdateMe }, context: any) => {
      await graphqlAuth(
        context,
        UserRole.ADMIN,
        UserRole.INSTRUCTOR,
        UserRole.STUDENT,
      );
      const { req } = context;
      const userId = req.user.userId;
      return await userService.updateMe(userId, data);
    },
  },
};
