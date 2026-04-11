import { contentService } from "./content.service";
import { IPaginationOptions } from "./content.interface";

export const contentResolvers = {
  Query: {
    allContents: async (_: any, args: any) => {
      const filter = args.filter || {};
      const paginationOptions: IPaginationOptions = {
        page: args.pagination?.page || 1,
        limit: args.pagination?.limit || 10,
        sortBy: args.pagination?.sortBy || "createdAt",
        sortOrder: args.pagination?.sortOrder || "desc",
      };
      return await contentService.getAllContents(filter, paginationOptions);
    },
    content: async (_: any, { id }: { id: string }) => {
      return await contentService.getContentById(id);
    },
    contentBySlug: async (_: any, { slug }: { slug: string }) => {
      return await contentService.getContentBySlug(slug);
    },
    contentsByModuleId: async (_: any, { moduleId }: { moduleId: string }) => {
      return await contentService.getContentsByModuleId(moduleId);
    },
  },
};