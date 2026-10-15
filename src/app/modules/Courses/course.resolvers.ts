import prismaClient from "../../../config/prismaClient";
import { courseService } from "./course.service";
import { IPaginationOptions } from "./course.interface";
import graphqlAuth from "../../middlewares/graphqlAuth";
import { UserRole } from "../../../generated/prisma/enums";
export const courseResolvers = {
  Query: {
    allCourses: async (_: any, args: any, context: any) => {
      await graphqlAuth(context, UserRole.SUPER_ADMIN, UserRole.ADMIN);
      const filter = args.filter || {};
      const paginationOptions: IPaginationOptions = {
        page: args.pagination?.page || 1,
        limit: args.pagination?.limit || 10,
        sortBy: args.pagination?.sortBy || "createdAt",
        sortOrder: args.pagination?.sortOrder || "desc",
      };
      return await courseService.getAllCourses(filter, paginationOptions);
    },
    course: async (_: any, { slug }: { slug: string }) => {
      return await courseService.getCourseBySlug(slug);
    },
    featuredCourses: async () => {
      return await courseService.getFeaturedCourses();
    },
    publishedCourses: async (_: any, args: any,) => {
      const filter = args.filter || {};
      const paginationOptions: IPaginationOptions = {
        page: args.pagination?.page || 1,
        limit: args.pagination?.limit || 10,
        sortBy: args.pagination?.sortBy || "createdAt",
        sortOrder: args.pagination?.sortOrder || "desc",
      };
      return await courseService.publishedCourses(filter, paginationOptions);
    },
  },
};
