import prismaClient from "../../../config/prismaClient";
import {
  ICreateCategory,
  IUpdateCategory,
  IPaginationOptions,
  IPaginatedCategories,
} from "./category.interface";
import { calculatePagination } from "../../../utils/pagination";
import { generateUniqueSlug } from "../../../utils/slugGenerator";

const createCategory = async (data: ICreateCategory) => {
  const slug = await generateUniqueSlug(data.name, { model: "category" });

  const result = await prismaClient.category.create({
    data: {
      name: data.name,
      slug,
      description: data.description || null,
    },
  });

  return result;
};

const getAllCategories = async (paginationOptions: IPaginationOptions) => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const [result, total] = await Promise.all([
    prismaClient.category.findMany({
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: {
        courses: true,
      },
    }),
    prismaClient.category.count(),
  ]);

  const response = {
    categories: result,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };

  return response;
};

const getCategoryBySlug = async (slug: string) => {
  const result = await prismaClient.category.findUnique({
    where: { slug },
    include: {
      courses: true,
    },
  });

  return result;
};

const updateCategory = async (id: string, data: IUpdateCategory) => {
  const result = await prismaClient.category.update({
    where: { id },
    data: {
      ...data,
    },
  });

  return result;
};

const deleteCategory = async (id: string) => {
  const result = await prismaClient.category.delete({
    where: { id },
  });

  return result;
};

export const categoryService = {
  createCategory,
  getAllCategories,
  getCategoryBySlug,
  updateCategory,
  deleteCategory,
};
