import prismaClient from "../../../config/prismaClient";
import { ICreateUserProgress, IUpdateUserProgress, IUserProgressFilter, IPaginationOptions, IPaginatedUserProgress } from "./progress.interface";
import { calculatePagination } from "../../../utils/pagination";

const createUserProgress = async (data: ICreateUserProgress) => {
  const [user, course] = await Promise.all([
    prismaClient.user.findUnique({ where: { id: data.userId } }),
    prismaClient.course.findUnique({ where: { id: data.courseId } }),
  ]);

  if (!user) throw new Error("User not found");
  if (!course) throw new Error("Course not found");

  const existing = await prismaClient.userProgress.findFirst({
    where: { userId: data.userId, courseId: data.courseId },
  });
  if (existing) throw new Error("Progress already exists for this user and course");

  const result = await prismaClient.userProgress.create({
    data: {
      userId: data.userId,
      courseId: data.courseId,
      progress: data.progress || 0,
      isCompleted: false,
      lastAccessed: new Date(),
    },
  });

  return result;
};

const getAllUserProgress = async (
  filter: IUserProgressFilter,
  paginationOptions: IPaginationOptions,
): Promise<IPaginatedUserProgress> => {
  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(paginationOptions);
  const where: any = {};
  if (filter.userId) where.userId = filter.userId;
  if (filter.courseId) where.courseId = filter.courseId;

  const [result, total] = await Promise.all([
    prismaClient.userProgress.findMany({
      where,
      include: { user: true, course: true },
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
    }),
    prismaClient.userProgress.count({ where }),
  ]);

  return { progressList: result, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
};

const getUserProgressById = async (id: string) => {
  const result = await prismaClient.userProgress.findUnique({
    where: { id },
    include: { user: true, course: true },
  });

  return result;
};

const getUserProgressByUserId = async (userId: string) => {
  const result = await prismaClient.userProgress.findMany({
    where: { userId },
    include: { course: true },
    orderBy: { lastAccessed: "desc" },
  });

  return result;
};

const getUserProgressByCourseId = async (courseId: string) => {
  const result = await prismaClient.userProgress.findMany({
    where: { courseId },
    include: { user: true },
    orderBy: { progress: "desc" },
  });

  return result;
};

const getUserProgressByUserAndCourse = async (userId: string, courseId: string) => {
  const result = await prismaClient.userProgress.findFirst({
    where: { userId, courseId },
    include: { user: true, course: true },
  });

  return result;
};

const updateUserProgress = async (id: string, data: IUpdateUserProgress) => {
  const existing = await prismaClient.userProgress.findUnique({ where: { id } });
  if (!existing) throw new Error("User progress not found");

  const result = await prismaClient.userProgress.update({
    where: { id },
    data: {
      ...data,
      lastAccessed: data.lastAccessed || new Date(),
    },
  });

  return result;
};

const deleteUserProgress = async (id: string) => {
  const existing = await prismaClient.userProgress.findUnique({ where: { id } });
  if (!existing) throw new Error("User progress not found");

  const result = await prismaClient.userProgress.delete({ where: { id } });

  return result;
};

export const userProgressService = {
  createUserProgress,
  getAllUserProgress,
  getUserProgressById,
  getUserProgressByUserId,
  getUserProgressByCourseId,
  getUserProgressByUserAndCourse,
  updateUserProgress,
  deleteUserProgress,
};