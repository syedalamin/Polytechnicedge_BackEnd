import { courseInstructorService } from "./courseInstructor.service";
import { IPaginationOptions } from "./courseInstructor.interface";
import graphqlAuth from "../../middlewares/graphqlAuth";
import { UserRole } from "../../../generated/prisma/enums";

export const courseInstructorResolvers = {
  Query: {
    allCourseInstructors: async (_: any, args: any, context: any) => {
      graphqlAuth(context, UserRole.SUPER_ADMIN, UserRole.ADMIN);
      const filter = args.filter || {};
      const paginationOptions: IPaginationOptions = {
        page: args.pagination?.page || 1,
        limit: args.pagination?.limit || 10,
        sortBy: args.pagination?.sortBy || "createdAt",
        sortOrder: args.pagination?.sortOrder || "desc",
      };
      return await courseInstructorService.getAllCourseInstructors(
        filter,
        paginationOptions,
      );
    },
    courseInstructor: async (_: any, { id }: { id: string }, context: any) => {
      graphqlAuth(context, UserRole.SUPER_ADMIN, UserRole.ADMIN);
      return await courseInstructorService.getCourseInstructorById(id);
    },
  },
};
