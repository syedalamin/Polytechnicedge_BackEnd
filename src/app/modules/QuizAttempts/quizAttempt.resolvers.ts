import prismaClient from "../../../config/prismaClient";
import { quizAttemptService } from "./quizAttempt.service";
import { IPaginationOptions } from "./quizAttempt.interface";

export const quizAttemptResolvers = {
  QuizAttempt: {
    user: async (parent: any) => {
      if (parent.user) return parent.user;
      return await prismaClient.user.findUnique({
        where: { id: parent.userId },
      });
    },
    quiz: async (parent: any) => {
      if (parent.quiz) return parent.quiz;
      return await prismaClient.quiz.findUnique({
        where: { id: parent.quizId },
      });
    },
    submissions: async (parent: any) => {
      if (parent.submissions) return parent.submissions;
      return await prismaClient.quizAttemptSubmission.findMany({
        where: { quizAttemptId: parent.id },
      });
    },
  },
  QuizAttemptSubmission: {
    quizAttempt: async (parent: any) => {
      if (parent.quizAttempt) return parent.quizAttempt;
      return await prismaClient.quizAttempt.findUnique({
        where: { id: parent.quizAttemptId },
      });
    },
    user: async (parent: any) => {
      if (parent.user) return parent.user;
      return await prismaClient.user.findUnique({
        where: { id: parent.userId },
      });
    },
  },
  Query: {
    allQuizAttempts: async (_: any, args: any) => {
      const filter = args.filter || {};
      const paginationOptions: IPaginationOptions = {
        page: args.pagination?.page || 1,
        limit: args.pagination?.limit || 10,
        sortBy: args.pagination?.sortBy || "createdAt",
        sortOrder: args.pagination?.sortOrder || "desc",
      };
      return await quizAttemptService.getAllQuizAttempts(filter, paginationOptions);
    },
    quizAttempt: async (_: any, { id }: { id: string }) => {
      return await quizAttemptService.getQuizAttemptById(id);
    },
    quizAttemptsByQuizId: async (_: any, { quizId }: { quizId: string }) => {
      return await quizAttemptService.getQuizAttemptsByQuizId(quizId);
    },
    quizAttemptsByUserId: async (_: any, { userId }: { userId: string }) => {
      return await quizAttemptService.getQuizAttemptsByUserId(userId);
    },
  },
};