import prismaClient from "../../../config/prismaClient";
import {
  ICreateContent,
  IUpdateContent,
  IContentFilter,
  IPaginationOptions,
  IPaginatedContents,
} from "./content.interface";
import { calculatePagination } from "../../../utils/pagination";
import { generateUniqueSlug } from "../../../utils/slugGenerator";

const createContent = async (data: ICreateContent) => {
  const module = await prismaClient.module.findUnique({
    where: { id: data.moduleId },
    include: { course: true },
  });

  if (!module) {
    throw new Error("Module not found");
  }

  const slug = await generateUniqueSlug(data.title, { model: "content" });

  const result = await prismaClient.content.create({
    data: {
      moduleId: data.moduleId,
      title: data.title,
      slug,
      contentType: data.contentType,
      contentUrl: data.contentUrl || null,
      textContent: data.textContent || null,
      isLocked: data.isLocked ?? true,
      duration: data.duration || null,
    },
  });

  return result;
};

const getAllContents = async (
  filter: IContentFilter,
  paginationOptions: IPaginationOptions,
): Promise<IPaginatedContents> => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const where: any = {};

  if (filter.moduleId) {
    where.moduleId = filter.moduleId;
  }
  if (filter.contentType) {
    where.contentType = filter.contentType;
  }
  if (filter.search) {
    where.OR = [
      { title: { contains: filter.search, mode: "insensitive" } },
      { slug: { contains: filter.search, mode: "insensitive" } },
    ];
  }

  const [result, total] = await Promise.all([
    prismaClient.content.findMany({
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
    prismaClient.content.count({ where }),
  ]);

  return {
    contents: result,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getContentById = async (id: string) => {
  const result = await prismaClient.content.findUnique({
    where: { id },
    include: {
      module: {
        include: {
          course: true,
        },
      },
    },
  });

  return result;
};

const getContentBySlug = async (slug: string) => {
  const result = await prismaClient.content.findFirst({
    where: { slug },
    include: {
      module: {
        include: {
          course: true,
        },
      },
    },
  });

  return result;
};

const getContentsByModuleId = async (moduleId: string) => {
  const result = await prismaClient.content.findMany({
    where: { moduleId },
    orderBy: { createdAt: "asc" },
  });

  return result;
};

const updateContent = async (id: string, data: IUpdateContent) => {
  const existingContent = await prismaClient.content.findUnique({
    where: { id },
    include: {
      module: {
        include: { course: true },
      },
    },
  });

  if (!existingContent) {
    throw new Error("Content not found");
  }

  const result = await prismaClient.content.update({
    where: { id },
    data: {
      ...data,
    },
  });

  return result;
};

const deleteContent = async (id: string) => {
  const existingContent = await prismaClient.content.findUnique({
    where: { id },
    include: {
      module: {
        include: { course: true },
      },
    },
  });

  if (!existingContent) {
    throw new Error("Content not found");
  }

  const result = await prismaClient.content.delete({
    where: { id },
  });

  return result;
};

export const contentService = {
  createContent,
  getAllContents,
  getContentById,
  getContentBySlug,
  getContentsByModuleId,
  updateContent,
  deleteContent,
};