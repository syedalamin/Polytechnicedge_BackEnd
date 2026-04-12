import { contentService } from "./content.service";
import { IPaginationOptions } from "./content.interface";

import graphqlAuth from "../../middlewares/graphqlAuth";
import { UserRole } from "../../../generated/prisma/enums";

export const contentResolvers = {
  Query: {
    allContents: async (_: any, args: any, context: any) => {
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
      return await contentService.getAllContents(filter, paginationOptions);
    },

    contentBySlug: async (_: any, { slug }: { slug: string }, context: any) => {
      graphqlAuth(
        context,
        UserRole.SUPER_ADMIN,
        UserRole.ADMIN,
        UserRole.INSTRUCTOR,
        UserRole.STUDENT,
      );
      return await contentService.getContentBySlug(slug);
    },
  },
};
