import prismaClient from "../../../config/prismaClient";
import {
  ICreateNotice,
  IUpdateNotice,
  INoticeFilter,
  IPaginationOptions,
  IPaginatedNotices,
} from "./notice.interface";
import { calculatePagination } from "../../../utils/pagination";
import { Request } from "express";

const createNotice = async (req: Request) => {
  const { userId } = req.user as { userId: string };
  const data = req.body as ICreateNotice;

  if (data.courseId) {
    const course = await prismaClient.course.findUnique({
      where: { id: data.courseId },
    });
    if (!course) throw new Error("Course not found");
  }

  const result = await prismaClient.notice.create({
    data: {
      title: data.title,
      content: data.content,
      authorId: userId,
      isGlobal: data.isGlobal || false,
      courseId: data.courseId || null,
    },
  });

  return result;
};

const getAllNotices = async (
  filter: INoticeFilter,
  paginationOptions: IPaginationOptions,
): Promise<IPaginatedNotices> => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);
  const where: any = {};
  if (filter.authorId) where.authorId = filter.authorId;
  if (filter.isGlobal !== undefined) where.isGlobal = filter.isGlobal;
  if (filter.courseId) where.courseId = filter.courseId;
  if (filter.search) {
    where.OR = [
      { title: { contains: filter.search, mode: "insensitive" } },
      { content: { contains: filter.search, mode: "insensitive" } },
    ];
  }

  const [result, total] = await Promise.all([
    prismaClient.notice.findMany({
      where,
      include: { author: true, course: true },
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
    }),
    prismaClient.notice.count({ where }),
  ]);

  return {
    notices: result,
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
};

const getNoticeById = async (id: string) => {
  const result = await prismaClient.notice.findUnique({
    where: { id },
    include: { author: true, course: true },
  });

  return result;
};

const getGlobalNotices = async () => {
  const result = await prismaClient.notice.findMany({
    where: { isGlobal: true },
    include: { author: true },
    orderBy: { createdAt: "desc" },
  });

  return result;
};

const updateNotice = async (id: string, data: IUpdateNotice) => {
  const existing = await prismaClient.notice.findUnique({ where: { id } });
  if (!existing) throw new Error("Notice not found");

  const result = await prismaClient.notice.update({
    where: { id },
    data: {
      ...data,
      courseId: data.courseId || null,
    },
  });

  return result;
};

const deleteNotice = async (id: string) => {
  const existing = await prismaClient.notice.findUnique({ where: { id } });
  if (!existing) throw new Error("Notice not found");

  const result = await prismaClient.notice.delete({ where: { id } });

  return result;
};

export const noticeService = {
  createNotice,
  getAllNotices,
  getNoticeById,
  getGlobalNotices,
  updateNotice,
  deleteNotice,
};
