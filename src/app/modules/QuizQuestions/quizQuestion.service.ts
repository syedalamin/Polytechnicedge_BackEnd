import prismaClient from "../../../config/prismaClient";
import { ICreateQuizQuestion, IUpdateQuizQuestion, IQuizQuestionFilter, IPaginationOptions, IPaginatedQuizQuestions } from "./quizQuestion.interface";
import { calculatePagination } from "../../../utils/pagination";

const createQuizQuestion = async (data: ICreateQuizQuestion) => {
  const quiz = await prismaClient.quiz.findUnique({
    where: { id: data.quizId },
    include: { module: { include: { course: true } } },
  });

  if (!quiz) {
    throw new Error("Quiz not found");
  }

  const result = await prismaClient.quizQuestion.create({
    data: {
      quizId: data.quizId,
      question: data.question,
      options: data.options,
      correctAnswer: data.correctAnswer,
      marks: data.marks,
      explanation: data.explanation || null,
    },
  });

  return result;
};

const getAllQuizQuestions = async (
  filter: IQuizQuestionFilter,
  paginationOptions: IPaginationOptions,
): Promise<IPaginatedQuizQuestions> => {
  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(paginationOptions);

  const where: any = {};
  if (filter.quizId) where.quizId = filter.quizId;
  if (filter.search) {
    where.OR = [{ question: { contains: filter.search, mode: "insensitive" } }];
  }

  const [result, total] = await Promise.all([
    prismaClient.quizQuestion.findMany({
      where,
      include: { quiz: true },
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
    }),
    prismaClient.quizQuestion.count({ where }),
  ]);

  return {
    questions: result,
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
};

const getQuizQuestionById = async (id: string) => {
  const result = await prismaClient.quizQuestion.findUnique({
    where: { id },
    include: { quiz: { include: { module: { include: { course: true } } } } },
  });

  return result;
};

const getQuizQuestionsByQuizId = async (quizId: string) => {
  const result = await prismaClient.quizQuestion.findMany({
    where: { quizId },
    orderBy: { createdAt: "asc" },
  });

  return result;
};

const updateQuizQuestion = async (id: string, data: IUpdateQuizQuestion) => {
  const existing = await prismaClient.quizQuestion.findUnique({
    where: { id },
    include: { quiz: { include: { module: { include: { course: true } } } } },
  });

  if (!existing) throw new Error("Quiz question not found");

  const result = await prismaClient.quizQuestion.update({ where: { id }, data });

  return result;
};

const deleteQuizQuestion = async (id: string) => {
  const existing = await prismaClient.quizQuestion.findUnique({
    where: { id },
    include: { quiz: { include: { module: { include: { course: true } } } } },
  });

  if (!existing) throw new Error("Quiz question not found");

  const result = await prismaClient.quizQuestion.delete({ where: { id } });

  return result;
};

export const quizQuestionService = {
  createQuizQuestion,
  getAllQuizQuestions,
  getQuizQuestionById,
  getQuizQuestionsByQuizId,
  updateQuizQuestion,
  deleteQuizQuestion,
};