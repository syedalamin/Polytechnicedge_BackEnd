import prismaClient from "../../../config/prismaClient";
import { moduleService } from "./module.service";
import { IPaginationOptions } from "./module.interface";
import graphqlAuth from "../../middlewares/graphqlAuth";
import { UserRole } from "../../../generated/prisma/enums";

export const moduleResolvers = {
  Query: {
    allModules: async (_: any, args: any, context: any) => {
      graphqlAuth(
        context,
        UserRole.SUPER_ADMIN,
        UserRole.ADMIN,
        UserRole.INSTRUCTOR,
        UserRole.STUDENT,
      );
      const filter = args.filter || {};
      const paginationOptions: IPaginationOptions = {
        page: args.pagination?.page || 1,
        limit: args.pagination?.limit || 10,
        sortBy: args.pagination?.sortBy || "createdAt",
        sortOrder: args.pagination?.sortOrder || "desc",
      };
      return await moduleService.getAllModules(filter, paginationOptions);
    },

    moduleBySlug: async (_: any, { slug }: { slug: string }, context: any) => {
      graphqlAuth(
        context,
        UserRole.SUPER_ADMIN,
        UserRole.ADMIN,
        UserRole.INSTRUCTOR,
        UserRole.STUDENT,
      );
      return await moduleService.getModuleBySlug(slug);
    },
  },
};
