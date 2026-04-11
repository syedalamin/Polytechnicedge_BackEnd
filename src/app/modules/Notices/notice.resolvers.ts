import { noticeService } from "./notice.service";
import { IPaginationOptions } from "./notice.interface";

export const noticeResolvers = {
  Query: {
    allNotices: async (_: any, args: any) => {
      const filter = args.filter || {};
      const paginationOptions: IPaginationOptions = {
        page: args.pagination?.page || 1,
        limit: args.pagination?.limit || 10,
        sortBy: args.pagination?.sortBy || "createdAt",
        sortOrder: args.pagination?.sortOrder || "desc",
      };
      return await noticeService.getAllNotices(filter, paginationOptions);
    },
    notice: async (_: any, { id }: { id: string }) => {
      return await noticeService.getNoticeById(id);
    },
    globalNotices: async () => {
      return await noticeService.getGlobalNotices();
    },
    noticesByCourseId: async (_: any, { courseId }: { courseId: string }) => {
      return await noticeService.getNoticesByCourseId(courseId);
    },
  },
};