import { noticeService } from "./notice.service";
import { IPaginationOptions } from "./notice.interface";
import graphqlAuth from "../../middlewares/graphqlAuth";
import { UserRole } from "../../../generated/prisma/enums";

export const noticeResolvers = {
  Query: {
    allNotices: async (_: any, args: any, context: any) => {
      await graphqlAuth(
        context,
        UserRole.ADMIN,
        UserRole.SUPER_ADMIN,
        UserRole.INSTRUCTOR,
      );
      const filter = args.filter || {};
      const paginationOptions: IPaginationOptions = {
        page: args.pagination?.page || 1,
        limit: args.pagination?.limit || 10,
        sortBy: args.pagination?.sortBy || "createdAt",
        sortOrder: args.pagination?.sortOrder || "desc",
      };
      return await noticeService.getAllNotices(filter, paginationOptions);
    },
    notice: async (_: any, { id }: { id: string }, context: any) => {
      await graphqlAuth(
        context,
        UserRole.ADMIN,
        UserRole.SUPER_ADMIN,
        UserRole.INSTRUCTOR,
        UserRole.STUDENT,
      );
      return await noticeService.getNoticeById(id);
    },
    globalNotices: async (_: any, __: any, context: any) => {
      await graphqlAuth(
        context,
        UserRole.ADMIN,
        UserRole.SUPER_ADMIN,
        UserRole.INSTRUCTOR,
        UserRole.STUDENT,
      );
      return await noticeService.getGlobalNotices();
    },
  
  },
};
