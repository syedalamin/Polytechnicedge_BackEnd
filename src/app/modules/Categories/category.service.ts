import prismaClient from "../../../config/prismaClient";
import {
  ICreateCategory,
  IUpdateCategory,
  IPaginationOptions,
  IPaginatedCategories,
} from "./category.interface";
import { calculatePagination } from "../../../utils/pagination";
import redis from "../../../utils/redis";
import { slugGenerator } from "../../../utils/slugGenerator";

const createCategory = async (data: ICreateCategory) => {
  const slug = await slugGenerator(data.name);

  const result = await prismaClient.category.create({
    data: {
      name: data.name,
      slug,
      description: data.description || null,
    },
  });

  await redis.del("categories:all");

  return result;
};

const getAllCategories = async (paginationOptions: IPaginationOptions) => {
  const cacheKey = "categories:all";
  const cachedData = await redis.get(cacheKey);
  if (cachedData) {
    return cachedData as IPaginatedCategories;
  }

  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const [result, total] = await Promise.all([
    prismaClient.category.findMany({
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
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

  await redis.set(cacheKey, response, 1800);

  return response;
};


const getCategoryBySlug = async (slug: string) => {
  const cacheKey = `category:slug:${slug}`;
  const cachedData = await redis.get(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  const result = await prismaClient.category.findUnique({
    where: { slug },
  });

  if (result) {
    await redis.set(cacheKey, result, 1800);
  }

  return result;
};

const updateCategory = async (id: string, data: IUpdateCategory) => {
  const result = await prismaClient.category.update({
    where: { id },
    data: {
      ...data,
    },
  });

  await redis.del("categories:all");
  if (result.slug) {
    await redis.del(`category:slug:${result.slug}`);
  }

  return result;
};

const deleteCategory = async (id: string) => {
  const result = await prismaClient.category.delete({
    where: { id },
  });

  await redis.del("categories:all")
  await redis.del(`category:slug:${result.slug}`);
  return result;
};

export const categoryService = {
  createCategory,
  getAllCategories,
  getCategoryBySlug,
  updateCategory,
  deleteCategory,
};
