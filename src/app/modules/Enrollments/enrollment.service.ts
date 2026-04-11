import prismaClient from "../../../config/prismaClient";
import { ICreateEnrollment, IUpdateEnrollment, IEnrollmentFilter, IPaginationOptions, IPaginatedEnrollments } from "./enrollment.interface";
import { calculatePagination } from "../../../utils/pagination";
import { EnrollmentStatus } from "../../../generated/prisma/enums";

const createEnrollment = async (data: ICreateEnrollment) => {
  const [user, course] = await Promise.all([
    prismaClient.user.findUnique({ where: { id: data.userId } }),
    prismaClient.course.findUnique({ where: { id: data.courseId } }),
  ]);

  if (!user) throw new Error("User not found");
  if (!course) throw new Error("Course not found");

  const existing = await prismaClient.enrollment.findFirst({
    where: { userId: data.userId, courseId: data.courseId },
  });
  if (existing) throw new Error("User already enrolled in this course");

  const expiresAt = data.expiresAt || new Date(Date.now() + (course.accessExpiresInDays || 365) * 24 * 60 * 60 * 1000);

  const result = await prismaClient.enrollment.create({
    data: {
      userId: data.userId,
      courseId: data.courseId,
      status: EnrollmentStatus.ACTIVE,
      expiresAt,
    },
  });

  return result;
};

const getAllEnrollments = async (
  filter: IEnrollmentFilter,
  paginationOptions: IPaginationOptions,
): Promise<IPaginatedEnrollments> => {
  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(paginationOptions);
  const where: any = {};
  if (filter.userId) where.userId = filter.userId;
  if (filter.courseId) where.courseId = filter.courseId;
  if (filter.status) where.status = filter.status;

  const [result, total] = await Promise.all([
    prismaClient.enrollment.findMany({
      where,
      include: { user: true, course: true },
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
    }),
    prismaClient.enrollment.count({ where }),
  ]);

  return { enrollments: result, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
};

const getEnrollmentById = async (id: string) => {
  const result = await prismaClient.enrollment.findUnique({
    where: { id },
    include: { user: true, course: true },
  });

  return result;
};

const getEnrollmentsByUserId = async (userId: string) => {
  const result = await prismaClient.enrollment.findMany({
    where: { userId },
    include: { course: true },
    orderBy: { enrolledAt: "desc" },
  });

  return result;
};

const getEnrollmentsByCourseId = async (courseId: string) => {
  const result = await prismaClient.enrollment.findMany({
    where: { courseId },
    include: { user: true },
    orderBy: { enrolledAt: "desc" },
  });

  return result;
};

const updateEnrollment = async (id: string, data: IUpdateEnrollment) => {
  const existing = await prismaClient.enrollment.findUnique({
    where: { id },
    include: { course: true },
  });
  if (!existing) throw new Error("Enrollment not found");

  const result = await prismaClient.enrollment.update({ where: { id }, data });

  return result;
};

const deleteEnrollment = async (id: string) => {
  const existing = await prismaClient.enrollment.findUnique({
    where: { id },
    include: { course: true },
  });
  if (!existing) throw new Error("Enrollment not found");

  const result = await prismaClient.enrollment.delete({ where: { id } });

  return result;
};

export const enrollmentService = {
  createEnrollment,
  getAllEnrollments,
  getEnrollmentById,
  getEnrollmentsByUserId,
  getEnrollmentsByCourseId,
  updateEnrollment,
  deleteEnrollment,
};