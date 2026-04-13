
import { courseBundleService } from "./bundle.service";
import { IPaginationOptions } from "./bundle.interface";

export const courseBundleResolvers = {

  Query: {
    allBundles: async (_: any, args: any) => {
      const filter = args.filter || {};
      const paginationOptions: IPaginationOptions = {
        page: args.pagination?.page || 1,
        limit: args.pagination?.limit || 10,
        sortBy: args.pagination?.sortBy || "createdAt",
        sortOrder: args.pagination?.sortOrder || "desc",
      };
      return await courseBundleService.getAllCourseBundles(filter, paginationOptions);
    },

    bundleBySlug: async (_: any, { slug }: { slug: string }) => {
      return await courseBundleService.getCourseBundleBySlug(slug);
    },
    publishedBundles: async () => {
      return await courseBundleService.getPublishedBundles();
    },
  },
};