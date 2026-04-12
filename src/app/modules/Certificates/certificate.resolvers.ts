import { certificateService } from "./certificate.service";
import { IPaginationOptions } from "./certificate.interface";
import graphqlAuth from "../../middlewares/graphqlAuth";
import { UserRole } from "../../../generated/prisma/enums";

export const certificateResolvers = {
  Query: {
    allCertificates: async (_: any, args: any, context: any) => {
      graphqlAuth(context, UserRole.SUPER_ADMIN, UserRole.ADMIN);
      const filter = args.filter || {};
      const paginationOptions: IPaginationOptions = {
        page: args.pagination?.page || 1,
        limit: args.pagination?.limit || 10,
        sortBy: args.pagination?.sortBy || "createdAt",
        sortOrder: args.pagination?.sortOrder || "desc",
      };
      return await certificateService.getAllCertificates(
        filter,
        paginationOptions,
      );
    },
    certificate: async (_: any, { id }: { id: string }, context: any) => {
      graphqlAuth(
        context,
        UserRole.SUPER_ADMIN,
        UserRole.ADMIN,
        UserRole.STUDENT,
      );
      return await certificateService.getCertificateById(id);
    },
    certificatesByUserId: async (
      _: any,
      { userId }: { userId: string },
      context: any,
    ) => {
      graphqlAuth(
        context,
        UserRole.SUPER_ADMIN,
        UserRole.ADMIN,
        UserRole.STUDENT,
      );
      return await certificateService.getCertificatesByUserId(userId);
    },
    certificatesByCourseId: async (
      _: any,
      { courseId }: { courseId: string },
      context: any,
    ) => {
      graphqlAuth(context, UserRole.SUPER_ADMIN, UserRole.ADMIN);
      return await certificateService.getCertificatesByCourseId(courseId);
    },
  },
};
