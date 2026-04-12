import { userProgressService } from "./progress.service";
import { IPaginationOptions } from "./progress.interface";
import graphqlAuth from "../../middlewares/graphqlAuth";
import { UserRole } from "../../../generated/prisma/enums";

export const userProgressResolvers = {
  Query: {
    allUserProgress: async (_: any, args: any, context: any) => {
      graphqlAuth(
        context,
        UserRole.SUPER_ADMIN,
        UserRole.ADMIN,
        UserRole.INSTRUCTOR,
      );
      const filter = args.filter || {};
      const paginationOptions: IPaginationOptions = {
        page: args.pagination?.page || 1,
        limit: args.pagination?.limit || 10,
        sortBy: args.pagination?.sortBy || "createdAt",
        sortOrder: args.pagination?.sortOrder || "desc",
      };
      return await userProgressService.getAllUserProgress(
        filter,
        paginationOptions,
      );
    },
    userProgress: async (_: any, { id }: { id: string }, context: any) => {
      graphqlAuth(
        context,
        UserRole.SUPER_ADMIN,
        UserRole.ADMIN,
        UserRole.INSTRUCTOR,
      );
      return await userProgressService.getUserProgressById(id);
    },
    userProgressByUserId: async (
      _: any,
      { userId }: { userId: string },
      context: any,
    ) => {
      graphqlAuth(
        context,
        UserRole.SUPER_ADMIN,
        UserRole.ADMIN,
        UserRole.INSTRUCTOR,
        UserRole.STUDENT,
      );
      return await userProgressService.getUserProgressByUserId(userId);
    },
    userProgressByCourseId: async (
      _: any,
      { courseId }: { courseId: string },
      context: any,
    ) => {
      graphqlAuth(
        context,
        UserRole.SUPER_ADMIN,
        UserRole.ADMIN,
        UserRole.INSTRUCTOR,
        UserRole.STUDENT,
      );
      return await userProgressService.getUserProgressByCourseId(courseId);
    },
    userProgressByUserAndCourse: async (
      _: any,
      { userId, courseId }: { userId: string; courseId: string },
      context: any,
    ) => {
      graphqlAuth(
        context,
        UserRole.SUPER_ADMIN,
        UserRole.ADMIN,
        UserRole.INSTRUCTOR,
        UserRole.STUDENT,
      );
      return await userProgressService.getUserProgressByUserAndCourse(
        userId,
        courseId,
      );
    },
  },
};
