import { quizQuestionService } from "./quizQuestion.service";
import { IPaginationOptions } from "./quizQuestion.interface";

export const quizQuestionResolvers = {
  Query: {
    allQuizQuestions: async (_: any, args: any) => {
      const filter = args.filter || {};
      const paginationOptions: IPaginationOptions = {
        page: args.pagination?.page || 1,
        limit: args.pagination?.limit || 10,
        sortBy: args.pagination?.sortBy || "createdAt",
        sortOrder: args.pagination?.sortOrder || "desc",
      };
      return await quizQuestionService.getAllQuizQuestions(filter, paginationOptions);
    },
    quizQuestion: async (_: any, { id }: { id: string }) => {
      return await quizQuestionService.getQuizQuestionById(id);
    },
    quizQuestionsByQuizId: async (_: any, { quizId }: { quizId: string }) => {
      return await quizQuestionService.getQuizQuestionsByQuizId(quizId);
    },
  },
};