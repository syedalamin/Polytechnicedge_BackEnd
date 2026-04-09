import { instructorService } from "./instructor.service";
import { IPaginationOptions } from "../../../utils/pagination";
import graphqlAuth from "../../middlewares/graphqlAuth";
import { UserRole } from "../../../generated/prisma/enums";
import { ICreateInstructor, IUpdateInstructor } from "./instructor.interface";

export interface PaginationArgs {
  pagination?: {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  };
}

export const instructorResolvers = {
  Query: {
    getAllInstructors: async (_: unknown, args: PaginationArgs, context: any) => {
      await graphqlAuth(context, UserRole.SUPER_ADMIN, UserRole.ADMIN);
      const paginationOptions: IPaginationOptions = {
        page: args.pagination?.page || 1,
        limit: args.pagination?.limit || 10,
        sortBy: args.pagination?.sortBy || 'createdAt',
        sortOrder: args.pagination?.sortOrder || 'desc',
      };
      return await instructorService.getAllInstructors(paginationOptions);
    },
    instructorProfile: async (_: unknown, { id }: { id: string }) => {
      return await instructorService.getInstructorProfile(id);
    },
  },
  Mutation: {
    createInstructor: async (_: unknown, { input }: { input: ICreateInstructor }, context: any) => {
      await graphqlAuth(context, UserRole.SUPER_ADMIN, UserRole.ADMIN);
      return await instructorService.createInstructor(input);
    },
    updateInstructor: async (_: unknown, { id, input }: { id: string; input: IUpdateInstructor }, context: any) => {
      await graphqlAuth(context, UserRole.SUPER_ADMIN, UserRole.ADMIN);
      return await instructorService.updateInstructorProfile(id, input);
    },
    deleteInstructor: async (_: unknown, { id }: { id: string }, context: any) => {
      await graphqlAuth(context, UserRole.SUPER_ADMIN, UserRole.ADMIN);
      return await instructorService.deleteInstructor(id);
    },
  },
};