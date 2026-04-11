import prismaClient from "../../../config/prismaClient";
import { moduleService } from "./module.service";
import { IPaginationOptions } from "./module.interface";

export const moduleResolvers = {
  Module: {
    contents: async (parent: any) => {
      if (parent.contents) return parent.contents;
      return await prismaClient.content.findMany({
        where: { moduleId: parent.id },
        orderBy: { createdAt: "asc" },
      });
    },
    quizzes: async (parent: any) => {
      if (parent.quizzes) return parent.quizzes;
      return await prismaClient.quiz.findMany({
        where: { moduleId: parent.id },
      });
    },
  },
  Query: {
    allModules: async (_: any, args: any) => {
      const filter = args.filter || {};
      const paginationOptions: IPaginationOptions = {
        page: args.pagination?.page || 1,
        limit: args.pagination?.limit || 10,
        sortBy: args.pagination?.sortBy || "createdAt",
        sortOrder: args.pagination?.sortOrder || "desc",
      };
      return await moduleService.getAllModules(filter, paginationOptions);
    },
    module: async (_: any, { id }: { id: string }) => {
      return await moduleService.getModuleById(id);
    },
    moduleBySlug: async (_: any, { slug }: { slug: string }) => {
      return await moduleService.getModuleBySlug(slug);
    },
    modulesByCourseId: async (_: any, { courseId }: { courseId: string }) => {
      return await moduleService.getModulesByCourseId(courseId);
    },
  },
};