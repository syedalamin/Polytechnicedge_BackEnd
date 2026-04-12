import prismaClient from "../../../config/prismaClient";
import {
  ICreateCourse,
  IUpdateCourse,
  ICourseFilter,
  IPaginationOptions,
  IPaginatedCourses,
  ICourse,
} from "./course.interface";
import { calculatePagination } from "../../../utils/pagination";
import { generateUniqueSlug } from "../../../utils/slugGenerator";
import { Request } from "express";

const createCourse = async (req: Request) => {
  const data: ICreateCourse = req.body;
  const user = req?.user;

  const authorId = user?.userId || "unknown";

  const slug = await generateUniqueSlug(data.title, { model: "course" });

  const result = await prismaClient.course.create({
    data: {
      title: data.title,
      slug,
      authorId: authorId,
      shortDescription: data.shortDescription || null,
      longDescription: data.longDescription || null,
      thumbnail: data.thumbnail || null,
      previewVideoUrl: data.previewVideoUrl || null,
      price: data.price,
      level: data.level || "ALL_LEVELS",
      categoryId: data.categoryId,
      durationHours: data.durationHours || null,
      whatYouWillLearn: data.whatYouWillLearn || [],
      requirements: data.requirements || [],
      prerequisites: data.prerequisites || [],
      tags: data.tags || [],
      accessExpiresInDays: data.accessExpiresInDays || 365,
    },
  });

  return result;
};

const getAllCourses = async (
  filter: ICourseFilter,
  paginationOptions: IPaginationOptions,
): Promise<IPaginatedCourses> => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const where: any = {};

  if (filter.categoryId) {
    where.categoryId = filter.categoryId;
  }
  if (filter.level) {
    where.level = filter.level;
  }
  if (filter.isFeatured !== undefined) {
    where.isFeatured = filter.isFeatured;
  }
  if (filter.isPublished !== undefined) {
    where.isPublished = filter.isPublished;
  }
  if (filter.search) {
    where.OR = [
      { title: { contains: filter.search, mode: "insensitive" } },
      { shortDescription: { contains: filter.search, mode: "insensitive" } },
      { tags: { has: filter.search } },
    ];
  }

  const [result, total] = await Promise.all([
    prismaClient.course.findMany({
      where,
      include: {
        category: true,
        modules: {
          include: { contents: true },
        },
        enrollments: true,
        orderItems: true,
        userProgress: true,
        certificates: true,
        notices: true,
        instructors: true,
        bundleItems: true,
      },
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
    }),
    prismaClient.course.count({ where }),
  ]);

  const response = {
    courses: result,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };

  return response;
};

const getCourseBySlug = async (slug: string) => {
  const result = await prismaClient.course.findUnique({
    where: { slug },
    include: {
      category: true,
      modules: {
        include: { contents: true },
      },
      enrollments: true,
      orderItems: true,
      userProgress: true,
      certificates: true,
      notices: true,
      instructors: true,
      bundleItems: true,
    },
  });

  return result;
};

const getFeaturedCourses = async (): Promise<ICourse[]> => {
  const result = await prismaClient.course.findMany({
    where: {
      isFeatured: true,
      isPublished: true,
    },
    include: {
      category: true,
    },
    take: 10,
  });

  return result;
};

const updateCourse = async (id: string, data: IUpdateCourse) => {
  const result = await prismaClient.course.update({
    where: { id },
    data: {
      ...data,
    },
  });

  return result;
};

const publishCourse = async (id: string) => {
  const result = await prismaClient.course.update({
    where: { id },
    data: {
      isPublished: true,
    },
  });

  return result;
};

const unpublishCourse = async (id: string) => {
  const result = await prismaClient.course.update({
    where: { id },
    data: {
      isPublished: false,
    },
  });

  return result;
};

const deleteCourse = async (id: string) => {
  const result = await prismaClient.course.delete({
    where: { id },
  });

  return result;
};

export const courseService = {
  createCourse,
  getAllCourses,
  getCourseBySlug,

  getFeaturedCourses,
  updateCourse,
  publishCourse,
  unpublishCourse,
  deleteCourse,
};
