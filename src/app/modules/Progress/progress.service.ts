import prismaClient from "../../../config/prismaClient";
import {
  ICreateUserProgress,
  IUserProgressFilter,
  IPaginationOptions,
  IPaginatedUserProgress,
} from "./progress.interface";
import { calculatePagination } from "../../../utils/pagination";
import { Request } from "express";

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
  if (existing)
    throw new Error("Progress already exists for this user and course");

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
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);
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

  return {
    progressList: result,
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
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

const getUserProgressByUserAndCourse = async (
  userId: string,
  courseId: string,
) => {
  const result = await prismaClient.userProgress.findFirst({
    where: { userId, courseId },
    include: { user: true, course: true },
  });

  return result;
};

const updateUserProgress = async (req: Request) => {
  const data = req.body;
  const { userId } = req.user as { userId: string };

  let userProgress = await prismaClient.userProgress.findUnique({
    where: {
      userId_courseId: { userId, courseId: data.courseId },
    },
  });

  if (!userProgress) {
    userProgress = await prismaClient.userProgress.create({
      data: {
        userId,
        courseId: data.courseId,
        completedContents: [],
      },
    });
  }

  let completedContents = [...userProgress.completedContents];

  if (data.isCompleted) {
    if (!completedContents.includes(data.contentId)) {
      completedContents.push(data.contentId);
    }
  } else {
    completedContents = completedContents.filter((id) => id !== data.contentId);
  }
  const totalContents = await prismaClient.content.count({
    where: {
      module: { courseId: data.courseId },
    },
  });

  const progressPercentage =
    totalContents > 0
      ? Math.round((completedContents.length / totalContents) * 100)
      : 0;

  const isCourseCompleted = progressPercentage === 100;

  const result = await prismaClient.userProgress.update({
    where: { id: userProgress.id },
    data: {
      completedContents,
      progress: progressPercentage,
      completedAt: isCourseCompleted ? new Date() : null,
      lastAccessed: new Date(),
    },
  });

  return result;
};

const markCourseComplete = async (courseId: string) => {
  const userProgressList = await prismaClient.userProgress.findMany({
    where: {
      courseId,
      progress: 100,
      isCompleted: false,
    },
  });

  if (userProgressList.length === 0) {
    throw new Error("No users found with 100% progress for this course");
  }

  await prismaClient.userProgress.updateMany({
    where: {
      courseId,
      progress: 100,
      isCompleted: false,
    },
    data: {
      isCompleted: true,
      completedAt: new Date(),
      lastAccessed: new Date(),
    },
  });

  return userProgressList;
};

const deleteUserProgress = async (id: string) => {
  const existing = await prismaClient.userProgress.findUnique({
    where: { id },
  });
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
  markCourseComplete,
  deleteUserProgress,
};
