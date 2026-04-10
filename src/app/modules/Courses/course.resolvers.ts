import { courseService } from "./course.service";
import { IPaginationOptions } from "./course.interface";
 

export const courseResolvers = {
  Query: {
    allCourses: async (_: any, args: any) => {
      
      const filter = args.filter || {};
      const paginationOptions: IPaginationOptions = {
        page: args.pagination?.page || 1,
        limit: args.pagination?.limit || 10,
        sortBy: args.pagination?.sortBy || "createdAt",
        sortOrder: args.pagination?.sortOrder || "desc",
      };
      return await courseService.getAllCourses(filter, paginationOptions);
    },
    course: async (_: any, { slug }: { slug: string }) => {

      return await courseService.getCourseBySlug(slug);
    },
    featuredCourses: async () => {
      return await courseService.getFeaturedCourses();
    },
  },

};
