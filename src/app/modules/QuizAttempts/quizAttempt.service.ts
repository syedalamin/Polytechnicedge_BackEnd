import prismaClient from "../../../config/prismaClient";
import { ICreateQuizAttempt, IUpdateQuizAttempt, IQuizAttemptFilter, IPaginationOptions, IPaginatedQuizAttempts } from "./quizAttempt.interface";
import { calculatePagination } from "../../../utils/pagination";

const createQuizAttempt = async (data: ICreateQuizAttempt) => {
  const quiz = await prismaClient.quiz.findUnique({ where: { id: data.quizId } });
  if (!quiz) throw new Error("Quiz not found");

  const lastAttempt = await prismaClient.quizAttempt.findFirst({
    where: { userId: data.userId, quizId: data.quizId },
    orderBy: { attemptCount: "desc" },
  });

  const result = await prismaClient.quizAttempt.create({
    data: {
      userId: data.userId,
      quizId: data.quizId,
      score: data.score,
      isPassed: data.isPassed,
      answers: data.answers,
      attemptCount: (lastAttempt?.attemptCount || 0) + 1,
      attemptedAt: new Date(),
    },
  });

  return result;
};

const getAllQuizAttempts = async (
  filter: IQuizAttemptFilter,
  paginationOptions: IPaginationOptions,
): Promise<IPaginatedQuizAttempts> => {
  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(paginationOptions);
  const where: any = {};
  if (filter.userId) where.userId = filter.userId;
  if (filter.quizId) where.quizId = filter.quizId;

  const [result, total] = await Promise.all([
    prismaClient.quizAttempt.findMany({
      where,
      include: { user: true, quiz: true },
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
    }),
    prismaClient.quizAttempt.count({ where }),
  ]);

  return { attempts: result, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
};

const getQuizAttemptById = async (id: string) => {
  const result = await prismaClient.quizAttempt.findUnique({
    where: { id },
    include: { user: true, quiz: { include: { module: true } } },
  });

  return result;
};

const getQuizAttemptsByQuizId = async (quizId: string) => {
  const result = await prismaClient.quizAttempt.findMany({
    where: { quizId },
    include: { user: true },
    orderBy: { attemptedAt: "desc" },
  });

  return result;
};

const getQuizAttemptsByUserId = async (userId: string) => {
  const result = await prismaClient.quizAttempt.findMany({
    where: { userId },
    include: { quiz: true },
    orderBy: { attemptedAt: "desc" },
  });

  return result;
};

const updateQuizAttempt = async (id: string, data: IUpdateQuizAttempt) => {
  const existing = await prismaClient.quizAttempt.findUnique({ where: { id } });
  if (!existing) throw new Error("Quiz attempt not found");

  const result = await prismaClient.quizAttempt.update({ where: { id }, data });

  return result;
};

const deleteQuizAttempt = async (id: string) => {
  const existing = await prismaClient.quizAttempt.findUnique({ where: { id } });
  if (!existing) throw new Error("Quiz attempt not found");

  const result = await prismaClient.quizAttempt.delete({ where: { id } });

  return result;
};

export const quizAttemptService = {
  createQuizAttempt,
  getAllQuizAttempts,
  getQuizAttemptById,
  getQuizAttemptsByQuizId,
  getQuizAttemptsByUserId,
  updateQuizAttempt,
  deleteQuizAttempt,
};