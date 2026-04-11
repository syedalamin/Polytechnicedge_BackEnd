import prismaClient from "../../../config/prismaClient";
import {
  ICreateModule,
  IUpdateModule,
  IModuleFilter,
  IPaginationOptions,
  IPaginatedModules,
} from "./module.interface";
import { calculatePagination } from "../../../utils/pagination";
import { generateUniqueSlug } from "../../../utils/slugGenerator";

const createModule = async (data: ICreateModule) => {
  const course = await prismaClient.course.findUnique({
    where: { id: data.courseId },
  });

  if (!course) {
    throw new Error("Course not found");
  }

  const slug = await generateUniqueSlug(data.title, { model: "module" });

  const result = await prismaClient.module.create({
    data: {
      courseId: data.courseId,
      weekNumber: data.weekNumber,
      title: data.title,
      slug,
      textInstruction: data.textInstruction || null,
      estimatedDuration: data.estimatedDuration,
    },
  });

  return result;
};

const getAllModules = async (
  filter: IModuleFilter,
  paginationOptions: IPaginationOptions,
): Promise<IPaginatedModules> => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const where: any = {};

  if (filter.courseId) {
    where.courseId = filter.courseId;
  }
  if (filter.search) {
    where.OR = [
      { title: { contains: filter.search, mode: "insensitive" } },
      { slug: { contains: filter.search, mode: "insensitive" } },
    ];
  }

  const [result, total] = await Promise.all([
    prismaClient.module.findMany({
      where,
      include: {
        course: true,
      },
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
    }),
    prismaClient.module.count({ where }),
  ]);

  return {
    modules: result,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getModuleById = async (id: string) => {
  const result = await prismaClient.module.findUnique({
    where: { id },
    include: {
      course: true,
      contents: true,
      quizzes: true,
    },
  });

  return result;
};

const getModuleBySlug = async (slug: string) => {
  const result = await prismaClient.module.findFirst({
    where: { slug },
    include: {
      course: true,
      contents: true,
      quizzes: true,
    },
  });

  return result;
};

const getModulesByCourseId = async (courseId: string) => {
  const result = await prismaClient.module.findMany({
    where: { courseId },
    include: {
      contents: true,
      quizzes: true,
    },
    orderBy: { weekNumber: "asc" },
  });

  return result;
};

const updateModule = async (id: string, data: IUpdateModule) => {
  const existingModule = await prismaClient.module.findUnique({
    where: { id },
    include: { course: true },
  });

  if (!existingModule) {
    throw new Error("Module not found");
  }

  const result = await prismaClient.module.update({
    where: { id },
    data: {
      ...data,
    },
  });

  return result;
};

const deleteModule = async (id: string) => {
  const existingModule = await prismaClient.module.findUnique({
    where: { id },
    include: { course: true },
  });

  if (!existingModule) {
    throw new Error("Module not found");
  }

  const result = await prismaClient.module.delete({
    where: { id },
  });

  return result;
};

export const moduleService = {
  createModule,
  getAllModules,
  getModuleById,
  getModuleBySlug,
  getModulesByCourseId,
  updateModule,
  deleteModule,
};