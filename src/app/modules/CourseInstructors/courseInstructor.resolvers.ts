import { courseInstructorService } from "./courseInstructor.service";
import { IPaginationOptions } from "./courseInstructor.interface";

export const courseInstructorResolvers = {
  Query: {
    allCourseInstructors: async (_: any, args: any) => {
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
    courseInstructor: async (_: any, { id }: { id: string }) => {
      return await courseInstructorService.getCourseInstructorById(id);
    },
    courseInstructorsByCourseId: async (
      _: any,
      { courseId }: { courseId: string },
    ) => {
      return await courseInstructorService.getCourseInstructorsByCourseId(
        courseId,
      );
    },
  },
};