import { UserRole } from "../../../generated/prisma/enums";
import graphqlAuth from "../../middlewares/graphqlAuth";
import { PaginationArgs } from "../Admins/admin.resolvers";
import { IPaginationOptions } from "./student.interface";
import { studentsService } from "./student.service";

export const studentResolvers = {
  Query: {
    studentProfile: async (_: any, { id }: { id: string }) => {
      return await studentsService.getStudentProfile(id);
    },
    getAllStudents: async (_: any, args: PaginationArgs, context: any) => {
      await graphqlAuth(context, UserRole.SUPER_ADMIN, UserRole.ADMIN);
      const paginationOptions: IPaginationOptions = {
        page: args.pagination?.page || 1,
        limit: args.pagination?.limit || 10,
        sortBy: args.pagination?.sortBy || "createdAt",
        sortOrder: args.pagination?.sortOrder || "desc",
      };
      return await studentsService.getAllStudents(paginationOptions);
    },
  },
};
