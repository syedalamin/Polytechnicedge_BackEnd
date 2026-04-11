import { enrollmentService } from "./enrollment.service";
import { IPaginationOptions } from "./enrollment.interface";

export const enrollmentResolvers = {
  Query: {
    allEnrollments: async (_: any, args: any) => {
      const filter = args.filter || {};
      const paginationOptions: IPaginationOptions = {
        page: args.pagination?.page || 1,
        limit: args.pagination?.limit || 10,
        sortBy: args.pagination?.sortBy || "createdAt",
        sortOrder: args.pagination?.sortOrder || "desc",
      };
      return await enrollmentService.getAllEnrollments(filter, paginationOptions);
    },
    enrollment: async (_: any, { id }: { id: string }) => {
      return await enrollmentService.getEnrollmentById(id);
    },
    enrollmentsByUserId: async (_: any, { userId }: { userId: string }) => {
      return await enrollmentService.getEnrollmentsByUserId(userId);
    },
    enrollmentsByCourseId: async (_: any, { courseId }: { courseId: string }) => {
      return await enrollmentService.getEnrollmentsByCourseId(courseId);
    },
  },
};