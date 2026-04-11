import { certificateService } from "./certificate.service";
import { IPaginationOptions } from "./certificate.interface";

export const certificateResolvers = {
  Query: {
    allCertificates: async (_: any, args: any) => {
      const filter = args.filter || {};
      const paginationOptions: IPaginationOptions = {
        page: args.pagination?.page || 1,
        limit: args.pagination?.limit || 10,
        sortBy: args.pagination?.sortBy || "createdAt",
        sortOrder: args.pagination?.sortOrder || "desc",
      };
      return await certificateService.getAllCertificates(filter, paginationOptions);
    },
    certificate: async (_: any, { id }: { id: string }) => {
      return await certificateService.getCertificateById(id);
    },
    certificatesByUserId: async (_: any, { userId }: { userId: string }) => {
      return await certificateService.getCertificatesByUserId(userId);
    },
    certificatesByCourseId: async (_: any, { courseId }: { courseId: string }) => {
      return await certificateService.getCertificatesByCourseId(courseId);
    },
  },
};