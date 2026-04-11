import { userProgressService } from "./progress.service";
import { IPaginationOptions } from "./progress.interface";

export const userProgressResolvers = {
  Query: {
    allUserProgress: async (_: any, args: any) => {
      const filter = args.filter || {};
      const paginationOptions: IPaginationOptions = {
        page: args.pagination?.page || 1,
        limit: args.pagination?.limit || 10,
        sortBy: args.pagination?.sortBy || "createdAt",
        sortOrder: args.pagination?.sortOrder || "desc",
      };
      return await userProgressService.getAllUserProgress(filter, paginationOptions);
    },
    userProgress: async (_: any, { id }: { id: string }) => {
      return await userProgressService.getUserProgressById(id);
    },
    userProgressByUserId: async (_: any, { userId }: { userId: string }) => {
      return await userProgressService.getUserProgressByUserId(userId);
    },
    userProgressByCourseId: async (_: any, { courseId }: { courseId: string }) => {
      return await userProgressService.getUserProgressByCourseId(courseId);
    },
    userProgressByUserAndCourse: async (_: any, { userId, courseId }: { userId: string; courseId: string }) => {
      return await userProgressService.getUserProgressByUserAndCourse(userId, courseId);
    },
  },
};