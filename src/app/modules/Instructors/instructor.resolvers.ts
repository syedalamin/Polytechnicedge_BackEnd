import prismaClient from "../../../config/prismaClient";
import { instructorService } from "./instructor.service";
import { IPaginationOptions } from "../../../utils/pagination";
import graphqlAuth from "../../middlewares/graphqlAuth";
import { UserRole } from "../../../generated/prisma/enums";
  

export interface PaginationArgs {
  pagination?: {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  };
}

export const instructorResolvers = {
  Instructor: {
    sessions: async (parent: any) => {
      if (parent.sessions) return parent.sessions;
      return await prismaClient.session.findMany({
        where: { instructorId: parent.id },
      });
    },
    courseInstructors: async (parent: any) => {
      if (parent.courseInstructors) return parent.courseInstructors;
      return await prismaClient.courseInstructor.findMany({
        where: { instructorId: parent.id },
        include: { course: true },
      });
    },
  },
  Query: {
    getAllInstructors: async (
      _: unknown,
      args: PaginationArgs,
      context: any,
    ) => {
      await graphqlAuth(
        context,
        UserRole.SUPER_ADMIN,
        UserRole.ADMIN,
        UserRole.INSTRUCTOR,
        UserRole.STUDENT,
      );
      const paginationOptions: IPaginationOptions = {
        page: args.pagination?.page || 1,
        limit: args.pagination?.limit || 10,
        sortBy: args.pagination?.sortBy || "createdAt",
        sortOrder: args.pagination?.sortOrder || "desc",
      };
      return await instructorService.getAllInstructors(paginationOptions);
    },
    instructorProfile: async (
      _: unknown,
      { id }: { id: string },
      context: any,
    ) => {
      await graphqlAuth(
        context,
        UserRole.SUPER_ADMIN,
        UserRole.ADMIN,
        UserRole.INSTRUCTOR,
        UserRole.STUDENT,
      );
      return await instructorService.getInstructorProfile(id);
    },
  },
};