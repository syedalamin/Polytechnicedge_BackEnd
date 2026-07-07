
import { categoryService } from "./category.service";
import { IPaginationOptions } from "./category.interface";
import graphqlAuth from "../../middlewares/graphqlAuth";
import { UserRole } from "../../../generated/prisma/enums";

export const categoryResolvers = {
 
  Query: {
    getAllCategories: async (_: any, args: any, context: any) => {
      
      await graphqlAuth(
        context,
        UserRole.SUPER_ADMIN,
        UserRole.ADMIN,
        UserRole.INSTRUCTOR,
      );
      const paginationOptions: IPaginationOptions = {
        page: args.pagination?.page || 1,
        limit: args.pagination?.limit || 10,
        sortBy: args.pagination?.sortBy || "createdAt",
        sortOrder: args.pagination?.sortOrder || "desc",
      };
      return await categoryService.getAllCategories(paginationOptions);
    },
   
    categoryBySlug: async (
      _: any,
      { slug }: { slug: string },
      context: any,
    ) => {
      await graphqlAuth(
        context,
        UserRole.SUPER_ADMIN,
        UserRole.ADMIN,
        UserRole.INSTRUCTOR,
      );
      return await categoryService.getCategoryBySlug(slug);
    },
  },
};
