import prismaClient from "../../../config/prismaClient";
import { courseBundleService } from "./bundle.service";
import { IPaginationOptions } from "./bundle.interface";

export const courseBundleResolvers = {
  CourseBundle: {
    items: async (parent: any) => {
      if (parent.items) return parent.items;
      return await prismaClient.courseBundleItem.findMany({
        where: { bundleId: parent.id },
        include: { course: true },
      });
    },
  },
  CourseBundleItem: {
    bundle: async (parent: any) => {
      if (parent.bundle) return parent.bundle;
      return await prismaClient.courseBundle.findUnique({
        where: { id: parent.bundleId },
      });
    },
    course: async (parent: any) => {
      if (parent.course) return parent.course;
      return await prismaClient.course.findUnique({
        where: { id: parent.courseId },
      });
    },
  },
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
    bundle: async (_: any, { id }: { id: string }) => {
      return await courseBundleService.getCourseBundleById(id);
    },
    bundleBySlug: async (_: any, { slug }: { slug: string }) => {
      return await courseBundleService.getCourseBundleBySlug(slug);
    },
    publishedBundles: async () => {
      return await courseBundleService.getPublishedBundles();
    },
  },
};