import prismaClient from "../../../config/prismaClient";
import { quizService } from "./quiz.service";
import { IPaginationOptions } from "./quiz.interface";

export const quizResolvers = {
  Quiz: {
    questions: async (parent: any) => {
      if (parent.questions) return parent.questions;
      return await prismaClient.quizQuestion.findMany({
        where: { quizId: parent.id },
        orderBy: { createdAt: "asc" },
      });
    },
    attempts: async (parent: any) => {
      if (parent.attempts) return parent.attempts;
      return await prismaClient.quizAttempt.findMany({
        where: { quizId: parent.id },
      });
    },
  },
  Query: {
    allQuizzes: async (_: any, args: any) => {
      const filter = args.filter || {};
      const paginationOptions: IPaginationOptions = {
        page: args.pagination?.page || 1,
        limit: args.pagination?.limit || 10,
        sortBy: args.pagination?.sortBy || "createdAt",
        sortOrder: args.pagination?.sortOrder || "desc",
      };
      return await quizService.getAllQuizzes(filter, paginationOptions);
    },
    quiz: async (_: any, { id }: { id: string }) => {
      return await quizService.getQuizById(id);
    },
    quizzesByModuleId: async (_: any, { moduleId }: { moduleId: string }) => {
      return await quizService.getQuizzesByModuleId(moduleId);
    },
  },
};