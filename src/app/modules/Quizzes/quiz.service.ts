import prismaClient from "../../../config/prismaClient";
import {
  ICreateQuiz,
  IUpdateQuiz,
  IQuizFilter,
  IPaginationOptions,
  IPaginatedQuizzes,
} from "./quiz.interface";
import { calculatePagination } from "../../../utils/pagination";

const createQuiz = async (data: ICreateQuiz) => {
  const module = await prismaClient.module.findUnique({
    where: { id: data.moduleId },
    include: { course: true },
  });

  if (!module) {
    throw new Error("Module not found");
  }

  const result = await prismaClient.quiz.create({
    data: {
      moduleId: data.moduleId,
      title: data.title,
      isAdaptive: data.isAdaptive ?? false,
      isLocked: data.isLocked ?? true,
      timeLimit: data.timeLimit ?? 2,
      passingScore: data.passingScore ?? 10,
    },
  });

  return result;
};

const getAllQuizzes = async (
  filter: IQuizFilter,
  paginationOptions: IPaginationOptions,
): Promise<IPaginatedQuizzes> => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const where: any = {};

  if (filter.moduleId) {
    where.moduleId = filter.moduleId;
  }
  if (filter.search) {
    where.OR = [
      { title: { contains: filter.search, mode: "insensitive" } },
    ];
  }

  const [result, total] = await Promise.all([
    prismaClient.quiz.findMany({
      where,
      include: {
        module: true,
      },
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
    }),
    prismaClient.quiz.count({ where }),
  ]);

  return {
    quizzes: result,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getQuizById = async (id: string) => {
  const result = await prismaClient.quiz.findUnique({
    where: { id },
    include: {
      module: {
        include: {
          course: true,
        },
      },
      questions: true,
      attempts: true,
    },
  });

  return result;
};

const getQuizzesByModuleId = async (moduleId: string) => {
  const result = await prismaClient.quiz.findMany({
    where: { moduleId },
    include: {
      questions: true,
    },
    orderBy: { createdAt: "asc" },
  });

  return result;
};

const updateQuiz = async (id: string, data: IUpdateQuiz) => {
  const existingQuiz = await prismaClient.quiz.findUnique({
    where: { id },
    include: {
      module: {
        include: { course: true },
      },
    },
  });

  if (!existingQuiz) {
    throw new Error("Quiz not found");
  }

  const result = await prismaClient.quiz.update({
    where: { id },
    data: {
      ...data,
    },
  });

  return result;
};

const deleteQuiz = async (id: string) => {
  const existingQuiz = await prismaClient.quiz.findUnique({
    where: { id },
    include: {
      module: {
        include: { course: true },
      },
    },
  });

  if (!existingQuiz) {
    throw new Error("Quiz not found");
  }

  const result = await prismaClient.quiz.delete({
    where: { id },
  });

  return result;
};

export const quizService = {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  getQuizzesByModuleId,
  updateQuiz,
  deleteQuiz,
};