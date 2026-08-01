import prismaClient from "../../../config/prismaClient";
import {
  ICreateCourseInstructor,
  ICourseInstructorFilter,
  IPaginationOptions,
  IPaginatedCourseInstructors,
} from "./courseInstructor.interface";
import { calculatePagination } from "../../../utils/pagination";

const createCourseInstructor = async (data: ICreateCourseInstructor) => {
  const [course, instructor] = await Promise.all([
    prismaClient.course.findUnique({ where: { id: data.courseId } }),
    prismaClient.instructorProfile.findUnique({
      where: { id: data.instructorId },
    }),
  ]);

  if (!course) {
    throw new Error("Course not found");
  }

  if (!instructor) {
    throw new Error("Instructor not found");
  }

  const existingInstructor = await prismaClient.courseInstructor.findFirst({
    where: {
      courseId: data.courseId,
      instructorId: data.instructorId,
    },
  });

  if (existingInstructor) {
    throw new Error("Instructor already assigned to this course");
  }

  const result = await prismaClient.courseInstructor.create({
    data: {
      courseId: data.courseId,
      instructorId: data.instructorId,
    },
  });

  return result;
};

const getAllCourseInstructors = async (
  filter: ICourseInstructorFilter,
  paginationOptions: IPaginationOptions,
): Promise<IPaginatedCourseInstructors> => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const where: any = {};

  if (filter.courseId) {
    where.courseId = filter.courseId;
  }
  if (filter.instructorId) {
    where.instructorId = filter.instructorId;
  }

  const [result, total] = await Promise.all([
    prismaClient.courseInstructor.findMany({
      where,
      include: {
        course: true,
        instructor: {
          include: {
            user: true,
          },
        },
      },
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
    }),
    prismaClient.courseInstructor.count({ where }),
  ]);

  return {
    courseInstructors: result,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};


const getCourseInstructorById = async (id: string) => {
  const result = await prismaClient.courseInstructor.findUnique({
    where: { id },
    include: {
      course: true,
      instructor: {
        include: {
          user: true,
        },
      },
    },
  });

  return result;
};

const deleteCourseInstructor = async (id: string) => {
  const existing = await prismaClient.courseInstructor.findUnique({
    where: { id },
    include: { course: true },
  });

  if (!existing) {
    throw new Error("Course instructor not found");
  }

  const result = await prismaClient.courseInstructor.delete({
    where: { id },
  });

  return result;
};

export const courseInstructorService = {
  createCourseInstructor,
  getAllCourseInstructors,
  getCourseInstructorById,
  deleteCourseInstructor,
};